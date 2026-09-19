import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("WARNING: DATABASE_URL environment variable is not defined.");
}

// Neon HTTP client for ultra-fast serverless queries
export const sql = neon(databaseUrl || "");

let isInitialized = false;

/**
 * Initializes required database tables if they do not already exist.
 */
export async function initDb() {
  if (isInitialized) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        birthday VARCHAR(50),
        gender VARCHAR(50) DEFAULT 'Male',
        membership_tier VARCHAR(50) DEFAULT 'VIP Black',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS wishlist_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER,
        name VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL,
        original_price NUMERIC,
        category VARCHAR(100),
        image VARCHAR(500),
        in_stock BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_product UNIQUE(user_id, name)
      );
    `;
    isInitialized = true;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}
