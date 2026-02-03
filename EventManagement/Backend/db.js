import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

export function getNeonConnection() {
  return neon(process.env.DATABASE_URL);
}
