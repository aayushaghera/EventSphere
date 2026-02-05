import dotenv from "dotenv";
dotenv.config();
import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

async function removeUnnecessaryColumns() {
  try {
    console.log("Removing unnecessary columns from user_profiles table...");
    
    // Remove the unwanted columns
    await sql`ALTER TABLE user_profiles DROP COLUMN IF EXISTS twitter`;
    console.log("✅ Removed twitter column");
    
    await sql`ALTER TABLE user_profiles DROP COLUMN IF EXISTS emergency_contact_name`;
    console.log("✅ Removed emergency_contact_name column");
    
    await sql`ALTER TABLE user_profiles DROP COLUMN IF EXISTS emergency_contact_phone`;
    console.log("✅ Removed emergency_contact_phone column");
    
    await sql`ALTER TABLE user_profiles DROP COLUMN IF EXISTS emergency_contact_relationship`;
    console.log("✅ Removed emergency_contact_relationship column");
    
    await sql`ALTER TABLE user_profiles DROP COLUMN IF EXISTS marketing_consent`;
    console.log("✅ Removed marketing_consent column");
    
    await sql`ALTER TABLE user_profiles DROP COLUMN IF EXISTS accessibility_needs`;
    console.log("✅ Removed accessibility_needs column");
    
    await sql`ALTER TABLE user_profiles DROP COLUMN IF EXISTS dietary_restrictions`;
    console.log("✅ Removed dietary_restrictions column");
    
    console.log("✅ All unnecessary columns removed successfully!");
    
    // Show remaining columns
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'user_profiles' 
      ORDER BY ordinal_position
    `;
    
    console.log("\n📋 Remaining columns in user_profiles table:");
    columns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });

  } catch (error) {
    console.error("❌ Error removing columns:", error);
  }
}

removeUnnecessaryColumns();