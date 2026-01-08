import mysql, { Pool } from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bcdc_website',
  waitForConnections: true,
  connectionLimit: 5, // Reduced for shared hosting limits
  queueLimit: 0,
  idleTimeout: 30000, // Release idle connections faster
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Add SSL configuration for cPanel remote MySQL if enabled
if (process.env.DB_SSL === 'true') {
  Object.assign(dbConfig, {
    ssl: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  });
}

// Singleton pattern to prevent multiple pools in development (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: Pool | undefined;
}

// Create or reuse connection pool
function getPool(): Pool {
  if (process.env.NODE_ENV === 'production') {
    // In production, create a new pool
    return mysql.createPool(dbConfig);
  } else {
    // In development, reuse the pool to prevent connection exhaustion
    if (!global.mysqlPool) {
      global.mysqlPool = mysql.createPool(dbConfig);
    }
    return global.mysqlPool;
  }
}

const pool = getPool();

// Generic query function with TypeScript support
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    await pool.execute('SELECT 1');
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Close all connections (useful for cleanup)
export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;
