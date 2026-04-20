/**
 * Database Abstraction Layer
 * Supports SQLite (development) and PostgreSQL (production)
 */

const sqlite3 = require('sqlite3').verbose();
const pg = require('pg');
const fs = require('fs');
const path = require('path');

let db = null;
let dbType = process.env.DATABASE_TYPE || 'sqlite';

/**
 * Initialize database based on DATABASE_TYPE
 */
async function initDatabase() {
  console.log(`Initializing ${dbType.toUpperCase()} database...`);

  if (dbType === 'sqlite') {
    return initSQLite();
  } else if (dbType === 'postgresql') {
    return initPostgreSQL();
  } else {
    throw new Error(`Unsupported database type: ${dbType}`);
  }
}

/**
 * Initialize SQLite database
 */
function initSQLite() {
  return new Promise((resolve, reject) => {
    const dbPath = process.env.DATABASE_PATH || './data/transactions.db';
    const dir = path.dirname(dbPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ SQLite connection error:', err);
        reject(err);
      } else {
        console.log(`✅ SQLite connected to ${dbPath}`);
        createTablesSQLite()
          .then(() => resolve(db))
          .catch(reject);
      }
    });
  });
}

/**
 * Initialize PostgreSQL database
 */
async function initPostgreSQL() {
  const pool = new pg.Pool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME || 'football_club_db',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log(`✅ PostgreSQL connected at ${res.rows[0].now}`);
    client.release();

    await createTablesPostgreSQL(pool);
    db = pool;
    return pool;
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err);
    throw err;
  }
}

/**
 * Create SQLite tables if they don't exist
 */
async function createTablesSQL() {
  const schema = `
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
      cart_items TEXT,
      mpesa_response TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_order_id ON transactions(order_id);
    CREATE INDEX IF NOT EXISTS idx_status ON transactions(status);
    CREATE INDEX IF NOT EXISTS idx_created_at ON transactions(created_at);
  `;

  return new Promise((resolve, reject) => {
    db.exec(schema, (err) => {
      if (err) {
        console.error('❌ Error creating SQLite tables:', err);
        reject(err);
      } else {
        console.log('✅ SQLite tables created');
        resolve();
      }
    });
  });
}

/**
 * Create SQLite tables (wrapper for Promise-based approach)
 */
function createTablesSQL() {
  return new Promise((resolve, reject) => {
    const schema = `
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
        cart_items TEXT,
        mpesa_response TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_order_id ON transactions(order_id);
      CREATE INDEX IF NOT EXISTS idx_status ON transactions(status);
      CREATE INDEX IF NOT EXISTS idx_created_at ON transactions(created_at);
    `;

    db.exec(schema, (err) => {
      if (err) {
        console.error('❌ Error creating SQLite tables:', err);
        reject(err);
      } else {
        console.log('✅ SQLite tables created');
        resolve();
      }
    });
  });
}

/**
 * Create PostgreSQL tables
 */
async function createTablesPostgreSQL(pool) {
  const schema = `
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
      cart_items JSONB,
      mpesa_response JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_order_id ON transactions(order_id);
    CREATE INDEX IF NOT EXISTS idx_status ON transactions(status);
    CREATE INDEX IF NOT EXISTS idx_created_at ON transactions(created_at);
  `;

  try {
    const client = await pool.connect();
    await client.query(schema);
    console.log('✅ PostgreSQL tables created');
    client.release();
  } catch (err) {
    if (err.code === '42P07') {
      console.log('✅ PostgreSQL tables already exist');
    } else {
      console.error('❌ Error creating PostgreSQL tables:', err);
      throw err;
    }
  }
}

/**
 * Save transaction to database
 */
async function saveTransaction(transactionData) {
  const {
    id,
    orderID,
    phoneNumber,
    amount,
    status = 'pending',
    paymentCode = null,
    customerFirstName,
    customerLastName,
    customerEmail,
    cartItems,
    mpesaResponse = null,
  } = transactionData;

  if (dbType === 'sqlite') {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR REPLACE INTO transactions (
          id, order_id, phone_number, amount, status, payment_code,
          customer_first_name, customer_last_name, customer_email, cart_items, mpesa_response
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          orderID,
          phoneNumber,
          amount,
          status,
          paymentCode,
          customerFirstName,
          customerLastName,
          customerEmail,
          JSON.stringify(cartItems),
          mpesaResponse ? JSON.stringify(mpesaResponse) : null,
        ],
        function (err) {
          if (err) {
            console.error('❌ Error saving transaction:', err);
            reject(err);
          } else {
            resolve({ id, orderID });
          }
        }
      );
    });
  } else {
    // PostgreSQL
    return await db.query(
      `INSERT INTO transactions (
        id, order_id, phone_number, amount, status, payment_code,
        customer_first_name, customer_last_name, customer_email, cart_items, mpesa_response
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (order_id) DO UPDATE SET
        status = $5, payment_code = $6, mpesa_response = $11, updated_at = CURRENT_TIMESTAMP`,
      [
        id,
        orderID,
        phoneNumber,
        amount,
        status,
        paymentCode,
        customerFirstName,
        customerLastName,
        customerEmail,
        cartItems,
        mpesaResponse,
      ]
    );
  }
}

/**
 * Get transaction by order ID
 */
async function getTransactionByOrderID(orderID) {
  if (dbType === 'sqlite') {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM transactions WHERE order_id = ?',
        [orderID],
        (err, row) => {
          if (err) {
            console.error('❌ Error fetching transaction:', err);
            reject(err);
          } else {
            if (row && row.cart_items) {
              row.cart_items = JSON.parse(row.cart_items);
            }
            if (row && row.mpesa_response) {
              row.mpesa_response = JSON.parse(row.mpesa_response);
            }
            resolve(row);
          }
        }
      );
    });
  } else {
    // PostgreSQL
    const result = await db.query(
      'SELECT * FROM transactions WHERE order_id = $1',
      [orderID]
    );
    return result.rows[0] || null;
  }
}

/**
 * Update transaction status
 */
async function updateTransactionStatus(orderID, status, paymentCode, mpesaResponse) {
  if (dbType === 'sqlite') {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE transactions SET status = ?, payment_code = ?, mpesa_response = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE order_id = ?`,
        [status, paymentCode, mpesaResponse ? JSON.stringify(mpesaResponse) : null, orderID],
        function (err) {
          if (err) {
            console.error('❌ Error updating transaction:', err);
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        }
      );
    });
  } else {
    // PostgreSQL
    return await db.query(
      `UPDATE transactions SET status = $1, payment_code = $2, mpesa_response = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE order_id = $4`,
      [status, paymentCode, mpesaResponse, orderID]
    );
  }
}

/**
 * Get all transactions (with optional filtering)
 */
async function getAllTransactions(filters = {}) {
  let query = 'SELECT * FROM transactions WHERE 1=1';
  const params = [];
  let paramIndex = 1;

  if (filters.status) {
    query += ` AND status = $${paramIndex}`;
    params.push(filters.status);
    paramIndex++;
  }

  if (filters.phoneNumber) {
    query += ` AND phone_number = $${paramIndex}`;
    params.push(filters.phoneNumber);
    paramIndex++;
  }

  if (filters.startDate) {
    query += ` AND created_at >= $${paramIndex}`;
    params.push(filters.startDate);
    paramIndex++;
  }

  if (filters.endDate) {
    query += ` AND created_at <= $${paramIndex}`;
    params.push(filters.endDate);
    paramIndex++;
  }

  query += ' ORDER BY created_at DESC LIMIT 100';

  if (dbType === 'sqlite') {
    return new Promise((resolve, reject) => {
      db.all(query.replace(/\$\d+/g, '?'), params, (err, rows) => {
        if (err) {
          console.error('❌ Error fetching transactions:', err);
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  } else {
    // PostgreSQL
    const result = await db.query(query, params);
    return result.rows;
  }
}

/**
 * Close database connection
 */
function closeDatabase() {
  if (dbType === 'sqlite' && db) {
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing SQLite:', err);
      } else {
        console.log('✅ SQLite closed');
      }
    });
  } else if (dbType === 'postgresql' && db) {
    db.end();
    console.log('✅ PostgreSQL pool closed');
  }
}

module.exports = {
  initDatabase,
  saveTransaction,
  getTransactionByOrderID,
  updateTransactionStatus,
  getAllTransactions,
  closeDatabase,
};
