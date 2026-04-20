const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const winston = require('winston');
const crypto = require('crypto');
const { initDatabase, saveTransaction, getTransactionByOrderID, updateTransactionStatus, getAllTransactions } = require('./db/database');

dotenv.config();

// ============= LOGGING SETUP =============
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'payment-server' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`)
      ),
    }),
    ...(process.env.LOG_FILE_PATH
      ? [new winston.transports.File({ filename: process.env.LOG_FILE_PATH })]
      : []),
  ],
});

const app = express();

// ============= SECURITY MIDDLEWARE =============

// Helmet for security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Stricter rate limiting for payment endpoints
const paymentLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 5, // 5 requests per minute
  message: 'Too many payment attempts. Please wait before trying again.',
  skipSuccessfulRequests: false,
});

// CORS configuration
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS origin denied: ${origin}`);
      callback(new Error(`CORS origin denied: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(bodyParser.json({ limit: '10kb' })); // Limit body size
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

// ============= AUTHENTICATION MIDDLEWARE =============

/**
 * API Key authentication middleware
 */
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    logger.warn('API request without API key');
    return res.status(401).json({
      success: false,
      message: 'Missing API key',
    });
  }

  if (apiKey !== process.env.API_KEY) {
    logger.warn(`Invalid API key attempt: ${apiKey.substring(0, 5)}...`);
    return res.status(403).json({
      success: false,
      message: 'Invalid API key',
    });
  }

  next();
};

// ============= DARAJA HELPER FUNCTIONS =============

/**
 * Get access token from Daraja
 */
async function getAccessToken() {
  try {
    const auth = Buffer.from(
      `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
    ).toString('base64');

    const response = await axios.get(
      `${process.env.MPESA_ENDPOINT}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        timeout: 10000,
      }
    );

    return response.data.access_token;
  } catch (error) {
    logger.error('Error getting access token: %s', error.message);
    throw error;
  }
}

/**
 * Initiate STK Push (prompt user for M-Pesa on their phone)
 */
async function initiateSTKPush(accessToken, phoneNumber, amount, orderID) {
  try {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:-]|\.\d{3}/g, '');
    const password = Buffer.from(
      `${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`
    ).toString('base64');

    const response = await axios.post(
      `${process.env.MPESA_ENDPOINT}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(amount),
        PartyA: phoneNumber,
        PartyB: process.env.SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: orderID,
        TransactionDesc: 'Football Club Payment',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    logger.error('Error initiating STK push: %s', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Sanitize phone number
 */
function sanitizePhoneNumber(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    throw new Error('Invalid phone number');
  }

  let formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
  
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '254' + formattedPhone.substring(1);
  } else if (!formattedPhone.startsWith('254')) {
    formattedPhone = '254' + formattedPhone;
  }

  // Validate phone number length (Kenya: 254 + 9 digits)
  if (!/^254[0-9]{9}$/.test(formattedPhone)) {
    throw new Error('Invalid phone number format');
  }

  return formattedPhone;
}

// ============= API ENDPOINTS =============

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Initiate payment
 */
app.post(
  '/api/payment/initiate',
  paymentLimiter,
  [
    body('phoneNumber').notEmpty().trim().escape(),
    body('amount').isFloat({ min: 1, max: 150000 }),
    body('orderID').notEmpty().trim().escape(),
    body('customerInfo.firstName').notEmpty().trim().escape(),
    body('customerInfo.lastName').notEmpty().trim().escape(),
    body('customerInfo.email').isEmail().normalizeEmail(),
    body('cartItems').isArray(),
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.warn('Validation error in /api/payment/initiate: %O', errors.array());
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { phoneNumber, amount, orderID, cartItems, customerInfo } = req.body;

      // Sanitize and validate phone number
      let formattedPhone;
      try {
        formattedPhone = sanitizePhoneNumber(phoneNumber);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      logger.info('Payment initiated for order: %s, amount: %d', orderID, amount);

      // Generate transaction ID
      const transactionId = crypto.randomUUID();

      // Save transaction to database
      await saveTransaction({
        id: transactionId,
        orderID,
        phoneNumber: formattedPhone,
        amount,
        status: 'pending',
        customerFirstName: customerInfo.firstName,
        customerLastName: customerInfo.lastName,
        customerEmail: customerInfo.email,
        cartItems,
      });

      // Get access token
      const accessToken = await getAccessToken();

      // Initiate STK push
      const stkResponse = await initiateSTKPush(
        accessToken,
        formattedPhone,
        amount,
        orderID
      );

      logger.info('STK push sent for order: %s, requestID: %s', orderID, stkResponse.RequestId);

      res.json({
        success: true,
        message: 'STK Push sent successfully. Check your phone for M-Pesa prompt.',
        requestID: stkResponse.RequestId,
        orderID: orderID,
        responseCode: stkResponse.ResponseCode,
      });
    } catch (error) {
      logger.error('Payment initiation error: %s', error.message);
      res.status(500).json({
        success: false,
        message: 'Error initiating payment. Please try again.',
      });
    }
  }
);

/**
 * Webhook endpoint for M-Pesa callbacks
 */
app.post('/api/payment/callback', async (req, res) => {
  try {
    const callbackData = req.body;
    logger.debug('Callback received: %O', callbackData);

    if (callbackData.Body && callbackData.Body.stkCallback) {
      const stkCallback = callbackData.Body.stkCallback;
      const orderID = stkCallback.CheckoutRequestID;
      const resultCode = stkCallback.ResultCode;

      let status = 'failed';
      let paymentCode = null;

      if (resultCode === 0) {
        status = 'completed';
        // Extract payment code if available
        if (stkCallback.CallbackMetadata && stkCallback.CallbackMetadata.Item) {
          const items = stkCallback.CallbackMetadata.Item;
          for (const item of items) {
            if (item.Name === 'MpesaReceiptNumber') {
              paymentCode = item.Value;
              break;
            }
          }
        }
        logger.info('Payment successful for order: %s, code: %s', orderID, paymentCode);
      } else {
        logger.warn('Payment failed for order: %s, resultCode: %d', orderID, resultCode);
      }

      // Update transaction in database
      await updateTransactionStatus(orderID, status, paymentCode, stkCallback);
    }

    // Always respond with success (Safaricom expects 200)
    res.json({
      ResultCode: 0,
      ResultDesc: 'The service request has been accepted successfully',
    });
  } catch (error) {
    logger.error('Callback error: %s', error.message);
    res.status(500).json({
      ResultCode: 1,
      ResultDesc: 'Error processing callback',
    });
  }
});

/**
 * Check payment status
 */
app.get('/api/payment/status/:orderID', async (req, res) => {
  try {
    const { orderID } = req.params;

    // Sanitize orderID
    if (!orderID || typeof orderID !== 'string' || orderID.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    const transaction = await getTransactionByOrderID(orderID);

    if (!transaction) {
      logger.warn('Transaction not found for orderID: %s', orderID);
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.json({
      success: true,
      orderID: orderID,
      status: transaction.status,
      amount: transaction.amount,
      phoneNumber: transaction.phone_number,
      createdAt: transaction.created_at,
    });
  } catch (error) {
    logger.error('Error fetching payment status: %s', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status',
    });
  }
});

/**
 * Get all transactions (admin endpoint - requires API key)
 */
app.get('/api/transactions', apiKeyAuth, async (req, res) => {
  try {
    logger.info('Admin accessing all transactions');
    
    const filters = {
      status: req.query.status,
      phoneNumber: req.query.phoneNumber,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    };

    const transactions = await getAllTransactions(filters);

    res.json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    logger.error('Error fetching transactions: %s', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
    });
  }
});

// ============= ERROR HANDLING =============

app.use((error, req, res, next) => {
  logger.error('Unhandled error: %s', error.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ============= START SERVER =============

async function startServer() {
  try {
    // Initialize database
    await initDatabase();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info('🚀 Payment server running on port %d', PORT);
      logger.info('Environment: %s', process.env.NODE_ENV || 'development');
      logger.info('M-Pesa Endpoint: %s', process.env.MPESA_ENDPOINT);
      logger.info('Database Type: %s', process.env.DATABASE_TYPE || 'sqlite');
    });
  } catch (error) {
    logger.error('Failed to start server: %s', error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
