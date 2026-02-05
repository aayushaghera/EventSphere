import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database on Neon');

    // Query to get all tables
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log('Tables in database:', tables.rows.map(row => row.table_name));

    // Optional: get server time
    const timeRes = await client.query("SELECT NOW()");
    console.log('Server time:', timeRes.rows[0].now);

  } catch (err) {
    console.error('❌ Connection error:', err.stack);
  } finally {
    await client.end();
  }
}

testConnection();
