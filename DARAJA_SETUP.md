# 🚀 Daraja M-Pesa Integration Setup Guide

This guide will help you set up the Daraja API payment integration with your football club website.

---

## 📋 Prerequisites

You need:
1. **Safaricom Business Account** (Lipa Na M-Pesa Online)
2. **Daraja Developer Account** - Register at: https://developer.safaricom.co.ke
3. **HostPinnacle Account** with Node.js support
4. **Git** for deployment (or FTP access)

---

## 🔑 Step 1: Get Daraja Credentials

1. Go to https://developer.safaricom.co.ke and sign in
2. Navigate to **"My Apps"** → Create a new app
3. Select **"M-Pesa"** as the product
4. You'll receive:
   - **Consumer Key** (API key)
   - **Consumer Secret** (API secret)
   - **Shortcode** (Business code, usually 174379 for sandbox)
   - **Passkey** (From Safaricom portal, under "Online Checkout")
   - **Initiator Password** (For STK push)

If Safaricom support already gave you sandbox details, use their sandbox `SHORTCODE` and `PASSKEY` values in your `.env` file.

Keep these credentials safe!

---

## 💻 Step 2: Setup Local Development

### Install Dependencies

```bash
# Navigate to the payment server directory
cd server
npm install
```

### Create .env File

Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
```

Then edit `.env`:

```
CONSUMER_KEY=your_consumer_key_here
CONSUMER_SECRET=your_consumer_secret_here
PASSKEY=your_passkey_here
SHORTCODE=174379
INITIATOR_PASSWORD=your_initiator_password_here
MPESA_ENDPOINT=https://sandbox.safaricom.co.ke
CALLBACK_URL=http://localhost:5000/api/payment/callback
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### Start the Payment Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Start the Frontend

In a new terminal:

```bash
cd .. (back to project root)
npm run dev
```

The website will run on `http://localhost:3000`

---

## 🧪 Step 3: Test Locally (Sandbox)

1. Open http://localhost:3000 in your browser
2. Add items to cart
3. Go to Checkout
4. Enter:
   - First Name: `Test`
   - Last Name: `User`
   - Email: `test@example.com`
   - M-Pesa Number: `254712345678` (or any number in sandbox)
5. Click "Pay with M-Pesa"

You should see an STK Push prompt appear on M-Pesa (if configured in sandbox)

---

## 🚀 Step 4: Deploy to HostPinnacle

### Option A: Using Git (Recommended)

1. **Create a Git repository:**
   ```bash
   git init
   git add -A
   git commit -m "Initial commit with Daraja integration"
   ```

2. **Push to HostPinnacle** (follow their Git deployment guide)

3. **On HostPinnacle, create `server/.env` with production credentials:**
   ```
   CONSUMER_KEY=your_production_key
   CONSUMER_SECRET=your_production_secret
   PASSKEY=your_production_passkey
   SHORTCODE=your_business_code
   INITIATOR_PASSWORD=your_initiator_password
   MPESA_ENDPOINT=https://api.safaricom.co.ke
   CALLBACK_URL=https://yourwebsite.com/api/payment/callback
   FRONTEND_URL=https://yourwebsite.com
   PORT=5000
   NODE_ENV=production
   ```

4. **On HostPinnacle CPanel:**
   - Install Node.js (if not already installed)
   - Create a Node.js App
   - Point it to the `server` directory
   - Set `server.js` as the startup file
   - Set environment to `production`

### Option B: Using FTP

1. Connect to HostPinnacle via FTP
2. Upload the `server` folder to your hosting account
3. Create `.env` file in the `server` folder
4. In CPanel, create a Node.js App pointing to `server/server.js`

---

## 🔄 Step 5: Update Frontend Config

In your React app, update `.env` or Vite config:

**Create `.env` in project root:**
```
VITE_API_URL=https://yourwebsite.com/api
```

Or for development:
```
VITE_API_URL=http://localhost:5000/api
```

If your frontend is deployed on Vercel, set `VITE_API_URL` in Vercel environment variables to your public backend URL. A Vercel-hosted site cannot call `http://localhost:5000` in the browser.

The React checkout page will automatically use this URL.

---

## 📱 Step 6: Switch to Production

When ready to go live:

1. **Update `.env` on HostPinnacle:**
   ```
   MPESA_ENDPOINT=https://api.safaricom.co.ke  (NOT sandbox)
   NODE_ENV=production
   ```

2. **Get production Daraja credentials:**
   - In your Safaricom business account, request production access
   - Update `CONSUMER_KEY`, `CONSUMER_SECRET`, etc.

3. **Test with real M-Pesa payments** (small amount first)

---

## 🔍 Troubleshooting

### "STK Push failed"
- Check `CONSUMER_KEY` and `CONSUMER_SECRET`
- Verify `SHORTCODE` is correct
- Ensure phone number format is correct (`254712345678`)

### "Callback not received"
- Update `CALLBACK_URL` to your actual domain
- Ensure HostPinnacle firewall allows incoming requests
- Check server logs for errors

### "Payment status shows 'pending' forever"
- Increase `maxAttempts` in Checkout.jsx
- Check M-Pesa messages on phone for confirmation
- Verify callback endpoint is working: `GET https://yoursite.com/api/health`

### CORS Errors
- Update `FRONTEND_URL` in `.env` to match your frontend domain
- Ensure CORS headers are correct in `server.js`

---

## 📊 Monitoring Payments

To view all transactions:

```bash
GET https://yoursite.com/api/transactions
```

Response:
```json
{
  "transactions": {
    "ORD-123456-abc": {
      "phoneNumber": "254712345678",
      "amount": 5000,
      "status": "completed",
      "createdAt": "2024-04-16T10:30:00Z"
    }
  }
}
```

---

## 🛡️ Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` to Git (add to `.gitignore`)
- Keep `CONSUMER_SECRET` and `PASSKEY` secret
- Use HTTPS in production
- Validate payment amounts on backend
- Consider adding order database instead of in-memory storage
- Add authentication to `/api/transactions` endpoint

---

## 📚 Resources

- [Safaricom Daraja Docs](https://developer.safaricom.co.ke/docs)
- [M-Pesa Integration Guide](https://developer.safaricom.co.ke/docs/v2/get-started/)
- [HostPinnacle Node.js Support](https://hostpinnacle.com/docs)

---

## ✅ Checklist

- [ ] Got Daraja credentials
- [ ] Created `.env` file locally
- [ ] Tested payment flow locally
- [ ] Got SSL certificate for domain
- [ ] Updated production credentials
- [ ] Deployed server and frontend
- [ ] Updated callback URL in production
- [ ] Tested with small real payment
- [ ] Set up payment history database (optional)
- [ ] Added security headers (optional)

---

Need help? Contact Safaricom support or check the Daraja documentation.
