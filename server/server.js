const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store transactions in memory (for demo - use database in production)
const transactions = {};

// ============= DARAJA HELPER FUNCTIONS =============

// Get access token from Daraja
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
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw error;
  }
}

// Initiate STK Push (prompt user for M-Pesa on their phone)
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
        Amount: Math.ceil(amount), // Amount must be integer
        PartyA: phoneNumber, // Customer phone number
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
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error initiating STK push:', error.response?.data || error.message);
    throw error;
  }
}

// ============= API ENDPOINTS =============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Initiate payment
app.post('/api/payment/initiate', async (req, res) => {
  try {
    const { phoneNumber, amount, orderID, cartItems } = req.body;

    // Validation
    if (!phoneNumber || !amount || !orderID) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: phoneNumber, amount, orderID',
      });
    }

    // Format phone number (must be in format: 254XXXXXXXXX)
    let formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    // Store transaction details
    transactions[orderID] = {
      phoneNumber: formattedPhone,
      amount: amount,
      cartItems: cartItems,
      status: 'pending',
      createdAt: new Date(),
    };

    // Get access token
    const accessToken = await getAccessToken();

    // Initiate STK push
    const stkResponse = await initiateSTKPush(
      accessToken,
      formattedPhone,
      amount,
      orderID
    );

    res.json({
      success: true,
      message: 'STK Push sent successfully. Check your phone for M-Pesa prompt.',
      requestID: stkResponse.RequestId,
      orderID: orderID,
      responseCode: stkResponse.ResponseCode,
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error initiating payment. Please try again.',
      error: error.message,
    });
  }
});

// Webhook endpoint for M-Pesa callbacks
app.post('/api/payment/callback', (req, res) => {
  try {
    const callbackData = req.body;
    console.log('Callback received:', JSON.stringify(callbackData, null, 2));

    if (callbackData.Body && callbackData.Body.stkCallback) {
      const stkCallback = callbackData.Body.stkCallback;
      const orderID = stkCallback.CheckoutRequestID;

      if (stkCallback.ResultCode === 0) {
        // Payment successful
        if (transactions[orderID]) {
          transactions[orderID].status = 'completed';
          transactions[orderID].resultCode = stkCallback.ResultCode;
        }

        console.log(`✓ Payment successful for order: ${orderID}`);
      } else {
        // Payment failed
        if (transactions[orderID]) {
          transactions[orderID].status = 'failed';
          transactions[orderID].resultCode = stkCallback.ResultCode;
        }

        console.log(`✗ Payment failed for order: ${orderID}`);
      }
    }

    // Always respond with success (Safaricom expects 200)
    res.json({
      ResultCode: 0,
      ResultDesc: 'The service request has been accepted successfully',
    });
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({
      ResultCode: 1,
      ResultDesc: 'Error processing callback',
    });
  }
});

// Check payment status
app.get('/api/payment/status/:orderID', (req, res) => {
  try {
    const { orderID } = req.params;
    const transaction = transactions[orderID];

    if (!transaction) {
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
      phoneNumber: transaction.phoneNumber,
      createdAt: transaction.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status',
    });
  }
});

// Get all transactions (for admin - remove in production or add auth)
app.get('/api/transactions', (req, res) => {
  res.json({
    transactions: transactions,
    note: 'This endpoint should be protected with authentication in production',
  });
});

// ============= START SERVER =============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Payment server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`M-Pesa Endpoint: ${process.env.MPESA_ENDPOINT}`);
});

module.exports = app;
