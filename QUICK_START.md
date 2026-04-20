# 🚀 Quick Start - Production-Ready Setup (5 Minutes)

## ⚡ Fast Track to Production

This guide gets you from development to production-ready in ~5 minutes.

---

## Step 1: Install Dependencies (2 min)

```bash
# Root directory
npm install

# Server directory
cd server
npm install
cd ..
```

---

## Step 2: Create .env Files (1 min)

### Backend
```bash
cp server/.env.example server/.env
```

**Edit `server/.env`** (minimum required):

```env
# Daraja Credentials (get from https://developer.safaricom.co.ke)
CONSUMER_KEY=your_daraja_key
CONSUMER_SECRET=your_daraja_secret
SHORTCODE=174379
PASSKEY=your_passkey
MPESA_ENDPOINT=https://sandbox.safaricom.co.ke

# Callback
CALLBACK_URL=http://localhost:5000/api/payment/callback

# Server
PORT=5000
NODE_ENV=development

# Database (SQLite for dev)
DATABASE_TYPE=sqlite
DATABASE_PATH=./data/transactions.db

# Security
API_KEY=development_key_12345678901234567890123456789
RATE_LIMIT_MAX_REQUESTS=200

# Logging
LOG_LEVEL=info
```

### Frontend
```bash
cp .env.example .env
```

**Edit `.env`**:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRAPI_URL=http://localhost:1337
VITE_ENV=development
```

---

## Step 3: Test Locally (2 min)

### Terminal 1 - Start Backend
```bash
cd server
npm run dev
```

Expected output:
```
✅ SQLite connected to ./data/transactions.db
✅ SQLite tables created
🚀 Payment server running on port 5000
```

### Terminal 2 - Start Frontend
```bash
npm run dev
```

Expected output:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/
```

### Browser
1. Open `http://localhost:5173`
2. Add items to cart
3. Go to checkout
4. Use test phone: `0722000000`
5. Pay via Daraja

### Verify Data Persistence
```bash
# In a new terminal
sqlite3 server/data/transactions.db "SELECT order_id, status, amount FROM transactions;"
```

---

## Production Changes (Highlights)

| Issue | Before | After |
|-------|--------|-------|
| **Secrets** | 🔴 Hardcoded | ✅ `.env` file |
| **Data** | 🔴 In-memory (lost on restart) | ✅ SQLite/PostgreSQL (persistent) |
| **API Auth** | 🔴 Public endpoint | ✅ API key required |
| **Rate Limit** | 🔴 None | ✅ 100 req/15min |
| **Input Validation** | 🔴 Basic | ✅ Full validation |
| **Security Headers** | 🔴 None | ✅ Helmet.js |
| **HTTPS** | 🔴 No enforcement | ✅ Required for prod |
| **Logging** | 🔴 console.log | ✅ Winston logger |
| **Strapi Config** | 🔴 Hardcoded | ✅ Env variable |

---

## 🚀 Deploy to HostPinnacle (Next Steps)

Once happy with local testing:

1. **Read**: [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)
2. **Choose database**: SQLite or PostgreSQL
3. **Get SSL cert**: Let's Encrypt
4. **Setup systemd service**: Auto-restart on failure
5. **Configure Nginx**: Reverse proxy + HTTPS
6. **Add monitoring**: Check logs regularly

---

## 🆘 Quick Troubleshooting

### "Cannot find module 'sqlite3'"
```bash
cd server && npm install && cd ..
```

### "Port 5000 already in use"
```bash
# Find process using port 5000
netstat -tlnp | grep 5000
# Kill it or change PORT in .env
```

### "API call returns 401"
- Check `API_KEY` in `.env` matches header
- Only needed for `/api/transactions` endpoint

### "Rate limited after 5 requests"
- This is the payment endpoint protection (working as intended!)
- Increase `RATE_LIMIT_MAX_REQUESTS` in `.env` for testing
- Set back to 100 for production

### "No transactions in database"
```bash
# Check database exists
ls -la server/data/

# Check schema
sqlite3 server/data/transactions.db ".schema transactions"

# Check file permissions
chmod 666 server/data/transactions.db
```

---

## 📝 Key Files

- ✅ [server/db/database.js](server/db/database.js) - New persistent database layer
- ✅ [server/server.js](server/server.js) - Updated with security
- ✅ [src/config.js](src/config.js) - Fixed hardcoded Strapi URL
- ✅ [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) - Full prod guide
- ✅ [PRODUCTION_FIXES_SUMMARY.md](PRODUCTION_FIXES_SUMMARY.md) - All changes explained

---

## 🎯 What's Next?

1. ✅ Local testing (you are here)
2. → Production deployment (see PRODUCTION_DEPLOYMENT.md)
3. → Switch to live Daraja
4. → Monitor logs and transactions
5. → Scale as needed

---

**Status**: Ready for testing! 🎉

Test the payment flow and verify transactions are saved to the database before deploying to production.
