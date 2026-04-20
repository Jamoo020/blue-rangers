# 🚀 Production Deployment Guide - Football Club App

> This guide addresses all **9 critical production blockers** and provides step-by-step deployment instructions for **HostPinnacle**.

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Security Implementation](#security-implementation)
4. [Database Configuration](#database-configuration)
5. [HostPinnacle Deployment](#hostpinnacle-deployment)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Monitoring & Logs](#monitoring--logs)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

- [ ] **Dependencies installed** - Run `npm install` in both root and `/server`
- [ ] **.env files created** - Copy `.env.example` files and fill with real values
- [ ] **Database initialized** - SQLite or PostgreSQL ready
- [ ] **API keys secured** - Daraja credentials + API key for endpoints
- [ ] **Frontend built** - `npm run build` completed
- [ ] **Backend tested locally** - Payment flow works in dev mode

---

## Environment Setup

### 1. Backend Server (.env)

Copy `server/.env.example` to `server/.env` and fill in all values:

```bash
cd server
cp .env.example .env
```

**Required values** (get from https://developer.safaricom.co.ke):
- `CONSUMER_KEY` - Daraja API key
- `CONSUMER_SECRET` - Daraja API secret
- `SHORTCODE` - Your business short code (e.g., 174379)
- `PASSKEY` - Daraja Passkey

**Production values**:
```env
# Daraja - Use PRODUCTION URLs/credentials
MPESA_ENDPOINT=https://api.safaricom.co.ke
CONSUMER_KEY=your_production_key
CONSUMER_SECRET=your_production_secret

# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-football-club.com,https://www.your-football-club.com

# Database - Choose ONE:

# Option A: SQLite (recommended for small apps)
DATABASE_TYPE=sqlite
DATABASE_PATH=/var/data/football_club/transactions.db

# Option B: PostgreSQL (recommended for production)
DATABASE_TYPE=postgresql
DATABASE_HOST=your-db-host.com
DATABASE_PORT=5432
DATABASE_NAME=football_club_db
DATABASE_USER=db_user
DATABASE_PASSWORD=your_secure_password

# Security
API_KEY=generate_with_node_-e_crypto.randomBytes_32

# Rate Limiting (per 15 minutes)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE_PATH=/var/log/football-club/server.log

# Callback (UPDATE THIS!)
CALLBACK_URL=https://api.your-hostpinnacle-domain.com/api/payment/callback
```

### 2. Frontend (.env)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

**Production values**:
```env
VITE_API_URL=https://api.your-hostpinnacle-domain.com/api
VITE_STRAPI_URL=https://your-strapi-instance.com
VITE_ENV=production
```

**How to generate secure API key**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Security Implementation

✅ **All security fixes already implemented in updated `server.js`:**

### 1. **Helmet.js** - Security Headers
- Protects against XSS, clickjacking, MIME sniffing
- Auto-configured in server.js

### 2. **Rate Limiting**
- General limit: 100 requests per 15 minutes
- Payment endpoint: 5 requests per 1 minute
- Prevents DDoS and brute force attacks

### 3. **CORS Protection**
- Whitelist allowed origins only (set in `FRONTEND_URL`)
- Prevents cross-site requests

### 4. **Input Validation & Sanitization**
- Phone number format validation (254 + 9 digits)
- Email validation
- Amount bounds checking (1 - 150,000 KES)
- XSS protection with `express-validator`

### 5. **Authentication**
- `/api/transactions` endpoint requires `X-API-Key` header
- Store API key in `.env` (secure, not committed to git)

```bash
# Example: Accessing admin endpoint
curl -H "X-API-Key: your_api_key" https://api.your-domain.com/api/transactions
```

### 6. **HTTPS Enforcement**
- All production URLs use HTTPS
- Set `CALLBACK_URL` to HTTPS
- Frontend enforces secure communication

---

## Database Configuration

### Option A: SQLite (Development/Small Production)

✅ **Recommended for**: Single server deployments, low transaction volume

```env
DATABASE_TYPE=sqlite
DATABASE_PATH=/var/data/football_club/transactions.db
```

**Manual backup**:
```bash
cp /var/data/football_club/transactions.db /backup/transactions.db.$(date +%Y%m%d)
```

### Option B: PostgreSQL (Recommended for Production)

✅ **Recommended for**: Scalability, multiple servers, high transaction volume

**Setup on HostPinnacle**:

1. **Provision PostgreSQL** via HostPinnacle dashboard
2. **Create database and user**:

```sql
CREATE DATABASE football_club_db;
CREATE USER db_user WITH PASSWORD 'your_secure_password';
ALTER ROLE db_user SET client_encoding TO 'utf8';
ALTER ROLE db_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE db_user SET default_transaction_deferrable TO on;
ALTER ROLE db_user SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE football_club_db TO db_user;
```

3. **Update `.env`**:
```env
DATABASE_TYPE=postgresql
DATABASE_HOST=hostpinnacle-db-hostname
DATABASE_PORT=5432
DATABASE_NAME=football_club_db
DATABASE_USER=db_user
DATABASE_PASSWORD=your_secure_password
```

4. **Tables auto-create** on server startup

**Backup PostgreSQL**:
```bash
pg_dump -U db_user -d football_club_db > backup.sql
```

---

## HostPinnacle Deployment

### Step 1: Prepare Application

```bash
# Install dependencies
npm install
cd server && npm install && cd ..

# Build frontend
npm run build

# Create production directories
mkdir -p /var/data/football_club
mkdir -p /var/log/football-club
chmod 755 /var/log/football-club
```

### Step 2: Create .env Files (Production)

Place `.env` files in:
- `/server/.env` - Backend configuration
- `/.env` - Frontend configuration (optional, for build time)

**⚠️ CRITICAL**: Never commit `.env` files to git. They're in `.gitignore` for security.

### Step 3: Deploy Backend (Node.js Server)

**Upload to HostPinnacle:**

1. **Via FTP/SFTP**:
   - Upload entire `/server` folder
   - Upload `package.json` from root
   - Create `/data` and `/logs` directories with proper permissions

2. **Via Git** (if HostPinnacle supports):
   ```bash
   git push hostpinnacle main
   ```

3. **Create systemd service** (`/etc/systemd/system/football-club.service`):

```ini
[Unit]
Description=Football Club Payment Server
After=network.target

[Service]
Type=simple
User=football-club
WorkingDirectory=/home/football-club/server
EnvironmentFile=/home/football-club/server/.env
ExecStart=/usr/bin/node /home/football-club/server/server.js
Restart=on-failure
RestartSec=10
StandardOutput=append:/var/log/football-club/server.log
StandardError=append:/var/log/football-club/server.error.log

[Install]
WantedBy=multi-user.target
```

**Start service**:
```bash
sudo systemctl enable football-club
sudo systemctl start football-club
sudo systemctl status football-club
```

### Step 4: Setup Reverse Proxy (Nginx/Apache)

**Nginx Configuration** (`/etc/nginx/sites-available/football-club`):

```nginx
server {
    listen 443 ssl http2;
    server_name api.your-hostpinnacle-domain.com;

    # SSL certificates (use Let's Encrypt via Certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.your-hostpinnacle-domain.com;
    return 301 https://$server_name$request_uri;
}
```

**Enable site**:
```bash
sudo ln -s /etc/nginx/sites-available/football-club /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Deploy Frontend (React)

**Build**:
```bash
npm run build
```

**Upload to web server** (Vercel recommended, or HostPinnacle static):

- Upload `dist/` folder to web root
- Frontend will call backend API at `https://api.your-domain.com/api`

---

## Post-Deployment Verification

### 1. **Check Backend Health**

```bash
curl https://api.your-domain.com/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "environment": "production",
  "timestamp": "2024-04-20T10:30:00.000Z"
}
```

### 2. **Verify HTTPS**

```bash
curl -I https://api.your-domain.com/api/health
```

Should show `HTTP/2 200`

### 3. **Test Payment Flow** (Sandbox)

1. Keep Daraja in **sandbox mode** initially
2. Use test M-Pesa number: 254722000000
3. Verify transaction appears in database:

```bash
# For SQLite
sqlite3 /var/data/football_club/transactions.db "SELECT * FROM transactions LIMIT 5;"

# For PostgreSQL
psql -U db_user -d football_club_db -c "SELECT * FROM transactions LIMIT 5;"
```

### 4. **Check Logs**

```bash
tail -f /var/log/football-club/server.log
```

### 5. **Test Rate Limiting**

```bash
# Should succeed
for i in {1..5}; do curl https://api.your-domain.com/api/payment/initiate; done

# Should be rate limited after 5 attempts
curl https://api.your-domain.com/api/payment/initiate
```

---

## Monitoring & Logs

### Log Files

- **Server Log**: `/var/log/football-club/server.log`
- **Error Log**: `/var/log/football-club/server.error.log`
- **Access Log**: Nginx logs in `/var/log/nginx/`

### Log Rotation

Create `/etc/logrotate.d/football-club`:

```
/var/log/football-club/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 football-club football-club
}
```

### Monitoring Setup

**Option 1: PM2** (Process Manager)

```bash
npm install -g pm2
pm2 start /server/server.js --name "football-club"
pm2 save
pm2 startup
```

**Option 2: Systemd** (Built-in)

Use the service file from Step 3 above.

---

## Troubleshooting

### Issue: "Cannot find module 'express'"

```bash
cd server && npm install
```

### Issue: "Payment endpoint returns 401 Unauthorized"

- Check `CONSUMER_KEY` and `CONSUMER_SECRET` are correct
- Verify `MPESA_ENDPOINT` is correct (sandbox vs production)
- Check network connectivity to Daraja

### Issue: "Rate limit exceeded"

- This is expected if testing too rapidly
- Wait 15 minutes or adjust `RATE_LIMIT_WINDOW_MS` in `.env`

### Issue: "Database locked" (SQLite)

- SQLite doesn't handle concurrent writes well
- Switch to PostgreSQL for production

### Issue: "Transaction data not persisting"

```bash
# Check database connection
curl -X GET https://api.your-domain.com/api/transactions \
  -H "X-API-Key: your_api_key"

# Check database file permissions
ls -la /var/data/football_club/transactions.db
```

### Issue: "CORS error from frontend"

- Verify `FRONTEND_URL` env var includes your domain
- Check browser console for exact origin
- Add to `FRONTEND_URL` in `.env`

---

## Production Checklist (Final)

Before going live with real M-Pesa transactions:

- [ ] Database is persistent (SQLite backup or PostgreSQL)
- [ ] HTTPS enabled on all endpoints
- [ ] API authentication working (`X-API-Key` required)
- [ ] Rate limiting active
- [ ] Input validation working
- [ ] Logging enabled and rotating
- [ ] Backup strategy in place
- [ ] Daraja credentials are **production** (not sandbox)
- [ ] `CALLBACK_URL` points to production domain
- [ ] Frontend environment variables set correctly
- [ ] Test payment completed successfully
- [ ] Admin can access `/api/transactions` with API key
- [ ] Monitoring alerts configured

---

## Quick Reference Commands

```bash
# Check server status
systemctl status football-club

# View live logs
journalctl -u football-club -f

# Restart server
systemctl restart football-club

# Check database
sqlite3 /var/data/football_club/transactions.db ".tables"

# Check if port is listening
netstat -tlnp | grep 5000

# Test API
curl -I https://api.your-domain.com/api/health
```

---

## Support

For issues or questions:
1. Check logs: `/var/log/football-club/server.log`
2. Test locally first with dev environment
3. Verify all `.env` values are correct
4. Check Daraja API status: https://developer.safaricom.co.ke

---

**Last Updated**: April 2024  
**Version**: 1.0 - Production Ready
