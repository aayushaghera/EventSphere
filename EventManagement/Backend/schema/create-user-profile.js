import dotenv from "dotenv";
dotenv.config();
import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

async function createUserProfilesTable() {
  try {
    console.log("Creating user_profiles table...");
    
    // Create the user_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        company VARCHAR(100),
        job_title VARCHAR(100),
        location VARCHAR(100),
        website VARCHAR(255),
        linkedin VARCHAR(255),
        twitter VARCHAR(100),
        dietary_restrictions TEXT[], 
        accessibility_needs TEXT[], 
        emergency_contact_name VARCHAR(100),
        emergency_contact_phone VARCHAR(15),
        emergency_contact_relationship VARCHAR(50),
        profile_image_url VARCHAR(500),
        date_of_birth DATE,
        preferred_communication VARCHAR(20) DEFAULT 'email',
        newsletter_subscribed BOOLEAN DEFAULT FALSE,
        marketing_consent BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id)
      )
    `;

    // Create index for faster lookups
    await sql`CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id)`;

    // Create or replace the trigger function
    await sql`
      CREATE OR REPLACE FUNCTION create_user_profile()
      RETURNS TRIGGER AS $$
      BEGIN
          INSERT INTO user_profiles (user_id) VALUES (NEW.id)
          ON CONFLICT (user_id) DO NOTHING;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `;

    // Create the trigger
    await sql`
      DROP TRIGGER IF EXISTS create_user_profile_trigger ON users
    `;
    
    await sql`
      CREATE TRIGGER create_user_profile_trigger
          AFTER INSERT ON users
          FOR EACH ROW
          EXECUTE FUNCTION create_user_profile()
    `;

    console.log("✅ user_profiles table created successfully!");
    console.log("✅ Trigger created to auto-create profiles for new users!");

    // Create profiles for existing users who don't have them
    const result = await sql`
      INSERT INTO user_profiles (user_id)
      SELECT id FROM users 
      WHERE id NOT IN (SELECT user_id FROM user_profiles WHERE user_id IS NOT NULL)
      ON CONFLICT (user_id) DO NOTHING
    `;

    console.log(`✅ Created profiles for ${result.length} existing users!`);

  } catch (error) {
    console.error("❌ Error creating user_profiles table:", error);
  }
}

createUserProfilesTable();