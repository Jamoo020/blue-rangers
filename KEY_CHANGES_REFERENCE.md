# 🔑 Key Changes Reference

Quick lookup for what was changed and where.

---

## Core Security Additions to `server/server.js`

### 1. Logging Setup (Lines 14-32)
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  // Logs to console + file with timestamps
});
```

### 2. Helmet Security Headers (Line 41)
```javascript
app.use(helmet());
// Adds 15+ security headers automatically
```

### 3. Rate Limiting (Lines 60-78)
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 900000,  // 15 minutes
  max: 100,          // 100 requests
});
const paymentLimiter = rateLimit({
  windowMs: 60000,   // 1 minute
  max: 5,            // 5 requests (stricter for payments)
});
app.use(limiter);
app.post('/api/payment/initiate', paymentLimiter, ...);
```

### 4. API Key Authentication (Lines 100-120)
```javascript
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Invalid API key' });
  }
  next();
};
app.get('/api/transactions', apiKeyAuth, ...);
```

### 5. Input Validation (Lines 303-320)
```javascript
app.post('/api/payment/initiate',
  paymentLimiter,
  [
    body('phoneNumber').notEmpty().trim().escape(),
    body('amount').isFloat({ min: 1, max: 150000 }),
    body('email').isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Continue with validated input
  }
);
```

### 6. Database Integration (Lines 10, 330+)
```javascript
const { saveTransaction, getTransactionByOrderID, updateTransactionStatus } = require('./db/database');

// Save transaction
await saveTransaction({
  id: transactionId,
  orderID,
  phoneNumber,
  amount,
  status: 'pending',
  customerInfo: {...},
  cartItems: {...},
});

// Update status
await updateTransactionStatus(orderID, 'completed', paymentCode, stkCallback);

// Query status
const transaction = await getTransactionByOrderID(orderID);
```

### 7. Phone Number Sanitization (Lines 280-297)
```javascript
function sanitizePhoneNumber(phoneNumber) {
  let formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
  
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '254' + formattedPhone.substring(1);
  } else if (!formattedPhone.startsWith('254')) {
    formattedPhone = '254' + formattedPhone;
  }

  // Validate: must be 254 + 9 digits
  if (!/^254[0-9]{9}$/.test(formattedPhone)) {
    throw new Error('Invalid phone number format');
  }

  return formattedPhone;
}
```

---

## Configuration Changes

### `server/.env.example`
**Added sections**:
- DATABASE_TYPE, DATABASE_PATH (SQLite)
- DATABASE_HOST, DATABASE_PORT (PostgreSQL)
- API_KEY (for /api/transactions authentication)
- RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS
- LOG_LEVEL, LOG_FILE_PATH
- ENABLE_HTTPS flag

### `src/config.js`
**Changed from**:
```javascript
const DEFAULT_STRAPI_URL = import.meta.env.DEV
  ? 'http://localhost:1337'
  : 'https://jolly-basket-d3988dc7c8.strapiapp.com'  // ❌ HARDCODED
```

**Changed to**:
```javascript
const DEFAULT_STRAPI_URL = import.meta.env.DEV
  ? 'http://localhost:1337'
  : null

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || DEFAULT_STRAPI_URL

if (!STRAPI_BASE_URL) {
  console.warn('⚠️ VITE_STRAPI_URL not configured...')
}
```

### `server/package.json`
**Added dependencies**:
```json
{
  "sqlite3": "^5.1.6",
  "pg": "^8.11.3",
  "express-rate-limit": "^7.1.5",
  "helmet": "^7.1.0",
  "express-validator": "^7.0.0",
  "winston": "^3.11.0"
}
```

---

## Database Schema (Auto-Created)

### SQLite Schema
```sql
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'KES',
  status TEXT DEFAULT 'pending',
  payment_code TEXT,
  customer_first_name TEXT,
  customer_last_name TEXT,
  customer_email TEXT,
  cart_items TEXT,              -- JSON stored as text
  mpesa_response TEXT,           -- JSON stored as text
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_id ON transactions(order_id);
CREATE INDEX idx_status ON transactions(status);
CREATE INDEX idx_created_at ON transactions(created_at);
```

### PostgreSQL Equivalent
```sql
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  status TEXT DEFAULT 'pending',
  payment_code TEXT,
  customer_first_name TEXT,
  customer_last_name TEXT,
  customer_email TEXT,
  cart_items JSONB,             -- Native JSON type
  mpesa_response JSONB,         -- Native JSON type
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variable Reference

### Backend (`.env` in `/server`)

| Variable | Dev Value | Prod Value | Purpose |
|----------|-----------|-----------|---------|
| `NODE_ENV` | development | production | Environment |
| `PORT` | 5000 | 5000 | Server port |
| `CONSUMER_KEY` | sandbox_key | prod_key | Daraja API |
| `CONSUMER_SECRET` | sandbox_secret | prod_secret | Daraja API |
| `MPESA_ENDPOINT` | sandbox.safaricom | api.safaricom | Daraja URL |
| `SHORTCODE` | 174379 | your_code | Business code |
| `PASSKEY` | dev_passkey | prod_passkey | Daraja |
| `CALLBACK_URL` | localhost:5000 | your-domain.com | Webhook |
| `DATABASE_TYPE` | sqlite | postgresql | DB type |
| `DATABASE_PATH` | ./data/transactions.db | /var/data/... | SQLite path |
| `API_KEY` | dev_key_123... | random_32_chars | Auth |
| `RATE_LIMIT_MAX_REQUESTS` | 200 | 100 | Requests/window |
| `LOG_LEVEL` | info | info | Log verbosity |
| `FRONTEND_URL` | localhost:3000 | your-domain.com | CORS |

### Frontend (`.env` in root)

| Variable | Dev Value | Prod Value | Purpose |
|----------|-----------|-----------|---------|
| `VITE_API_URL` | localhost:5000/api | your-domain.com/api | Backend URL |
| `VITE_STRAPI_URL` | localhost:1337 | your-strapi.com | CMS URL |
| `VITE_ENV` | development | production | Environment |

---

## API Endpoints Summary

### Changed Endpoints

#### POST /api/payment/initiate
**Before**: No validation  
**After**: Full validation + rate limit (5 req/min)

```bash
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "0722000000",
    "amount": 5000,
    "orderID": "ORD-123",
    "customerInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "cartItems": [...]
  }'
```

#### GET /api/transactions
**Before**: Public, anyone can access  
**After**: Requires API key

```bash
curl -H "X-API-Key: your_api_key" http://localhost:5000/api/transactions
```

#### POST /api/payment/callback
**Before**: No validation  
**After**: Logs to database, proper error handling

#### GET /api/payment/status/:orderID
**Before**: In-memory lookup  
**After**: Database query, validates orderID

#### GET /api/health
**Before**: Basic response  
**After**: Includes environment, timestamp

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "location": "body",
      "param": "phoneNumber",
      "msg": "Invalid value"
    }
  ]
}
```

### Rate Limited (429)
```json
{
  "message": "Too many payment attempts. Please wait before trying again."
}
```

### Authentication Failed (403)
```json
{
  "success": false,
  "message": "Invalid API key"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Error initiating payment. Please try again."
}
```

---

## Testing Commands

### Local Development
```bash
# Start frontend
npm run dev

# Start backend (in another terminal)
cd server && npm run dev

# Test health
curl http://localhost:5000/api/health

# Test payment (will create DB entry)
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"0722000000","amount":100,"orderID":"TEST-1","customerInfo":{"firstName":"Test","lastName":"User","email":"test@example.com"},"cartItems":[]}'

# Check database
sqlite3 server/data/transactions.db "SELECT * FROM transactions LIMIT 1;"

# Test rate limiting (try 6 times quickly)
for i in {1..6}; do curl -X POST http://localhost:5000/api/payment/initiate -H "Content-Type: application/json" -d '{}'; sleep 0.5; done

# Check logs
tail -f server.log  # If using file logging
```

### Production
```bash
# Health check
curl https://api.your-domain.com/api/health

# Admin endpoint (requires API key)
curl -H "X-API-Key: your_key" https://api.your-domain.com/api/transactions

# Check live logs
sudo journalctl -u football-club -f

# View server status
sudo systemctl status football-club
```

---

## File Structure Quick Reference

```
Football club/
├── README_PRODUCTION_READY.md       ← THIS SUMMARY
├── QUICK_START.md                   ← 5-min setup
├── PRODUCTION_DEPLOYMENT.md         ← Full guide
├── PRODUCTION_FIXES_SUMMARY.md      ← Details
├── IMPLEMENTATION_STATUS.md         ← Architecture
│
├── src/config.js                    ← FIXED: Env var for Strapi
├── .env.example                     ← NEW: Frontend config template
├── .gitignore                       ← GOOD: Already excludes .env
│
├── server/
│   ├── server.js                    ← REWRITTEN: Security + DB
│   ├── .env.example                 ← UPDATED: All config options
│   ├── package.json                 ← UPDATED: Security packages
│   ├── db/
│   │   └── database.js              ← NEW: DB abstraction (500+ lines)
│   └── data/
│       └── transactions.db          ← AUTO-CREATED: SQLite DB
│
└── ... (other files unchanged)
```

---

## Deployment Checklist

### Local Testing
- [ ] `npm install && cd server && npm install && cd ..`
- [ ] `cp server/.env.example server/.env`
- [ ] Fill `.env` with sandbox Daraja credentials
- [ ] `npm run dev` (frontend)
- [ ] `cd server && npm run dev` (backend)
- [ ] Test payment flow in browser
- [ ] Verify transaction in database

### Before Production
- [ ] Generate secure API key: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Choose database: SQLite or PostgreSQL
- [ ] Get HTTPS certificate (Let's Encrypt)
- [ ] Configure Nginx reverse proxy
- [ ] Create systemd service
- [ ] Setup log rotation
- [ ] Configure backups

### Production Go-Live
- [ ] Switch to production Daraja credentials
- [ ] Update CALLBACK_URL to live domain
- [ ] Set FRONTEND_URL to your domain
- [ ] Test with 1 KES transaction
- [ ] Monitor logs 24/7 for first 48 hours
- [ ] Gradually increase traffic

---

**Quick Links**:
- ⚡ [QUICK_START.md](QUICK_START.md) - Start here
- 🚀 [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) - Deploy guide
- 📋 [PRODUCTION_FIXES_SUMMARY.md](PRODUCTION_FIXES_SUMMARY.md) - What was fixed
- 📊 [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) - Architecture details

---

**Last Updated**: April 20, 2024
