import dotenv from "dotenv";
dotenv.config();
// const { Client } = require('pg');
import { Client } from "pg";
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

client.connect()
  .then(() => client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"))
  .then(res => {
    console.log('Tables:', res.rows.map(row => row.table_name));
    return client.end();
  })
  .catch(err => console.error(err));