import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database on Render");

    // Ordered table creation respecting foreign key dependencies
    await client.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      user_type VARCHAR(20) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(15),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    await client.query(`CREATE TABLE IF NOT EXISTS attendees (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      date_of_birth DATE,
      preferred_event_types TEXT,
      total_events_attended INT DEFAULT 0,
      loyalty_points INT DEFAULT 0,
      notification_preferences JSON,
      emergency_contact_name VARCHAR(100),
      emergency_contact_phone VARCHAR(15),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);

    await client.query(`CREATE TABLE IF NOT EXISTS event_organizers (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      organization_name VARCHAR(200) NOT NULL,
      organization_type VARCHAR(20) NOT NULL,
      website_url VARCHAR(255),
      business_license VARCHAR(100),
      experience_years INT DEFAULT 0,
      total_events_organized INT DEFAULT 0,
      rating DECIMAL(3,2) DEFAULT 0.0,
      verification_status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);

    await client.query(`CREATE TABLE IF NOT EXISTS venues (
      id SERIAL PRIMARY KEY,
      owner_id INT NOT NULL,
      venue_name VARCHAR(200) NOT NULL,
      address TEXT NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      pincode VARCHAR(10),
      venue_type VARCHAR(30) NOT NULL,
      capacity INT NOT NULL,
      hourly_rate DECIMAL(10,2) NOT NULL,
      facilities JSON,
      description TEXT,
      contact_person VARCHAR(100),
      contact_phone VARCHAR(15),
      latitude DECIMAL(10,8),
      longitude DECIMAL(11,8),
      is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        organizer_id INT NOT NULL,
        venue_id INT NOT NULL,
        event_title VARCHAR(200) NOT NULL,
        event_category VARCHAR(30) NOT NULL,
        description TEXT NOT NULL,
        start_datetime TIMESTAMP NOT NULL,
        end_datetime TIMESTAMP NOT NULL,
        event_type VARCHAR(20) DEFAULT 'public',
        event_capacity INT NOT NULL,
        age_restriction VARCHAR(20) DEFAULT 'all_ages',
        registration_start_date TIMESTAMP,
        registration_end_date TIMESTAMP,
        event_status VARCHAR(20) DEFAULT 'draft',
        banner_image_url VARCHAR(255),
        total_tickets_sold INT DEFAULT 0,
        total_revenue DECIMAL(12,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (organizer_id) REFERENCES event_organizers(id),
        FOREIGN KEY (venue_id) REFERENCES venues(id)
      );
      CREATE TABLE IF NOT EXISTS ticket_types (
        id SERIAL PRIMARY KEY,
        event_id INT NOT NULL,
        ticket_name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(8,2) NOT NULL,
        quantity_available INT NOT NULL,
        quantity_sold INT DEFAULT 0,
        sale_start_datetime TIMESTAMP,
        sale_end_datetime TIMESTAMP,
        early_bird_deadline TIMESTAMP,
        early_bird_discount DECIMAL(5,2) DEFAULT 0.00,
        group_minimum INT DEFAULT 10,
        group_discount DECIMAL(5,2) DEFAULT 0.00,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_id VARCHAR(20) UNIQUE NOT NULL,
        event_id INT NOT NULL,
        attendee_id INT NOT NULL,
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_tickets INT NOT NULL,
        subtotal_amount DECIMAL(10,2) NOT NULL,
        discount_amount DECIMAL(8,2) DEFAULT 0.00,
        tax_amount DECIMAL(8,2) NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        booking_status VARCHAR(20) DEFAULT 'pending',
        payment_status VARCHAR(20) DEFAULT 'pending',
        payment_method VARCHAR(50),
        transaction_id VARCHAR(100),
        discount_code VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id),
        FOREIGN KEY (attendee_id) REFERENCES attendees(id)
      );
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        booking_id INT NOT NULL,
        ticket_type_id INT NOT NULL,
        ticket_number VARCHAR(20) UNIQUE NOT NULL,
        attendee_name VARCHAR(100) NOT NULL,
        attendee_email VARCHAR(100),
        attendee_phone VARCHAR(15),
        ticket_price DECIMAL(8,2) NOT NULL,
        check_in_status VARCHAR(20) DEFAULT 'not_checked_in',
        check_in_time TIMESTAMP NULL,
        qr_code VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
        FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id)
      );
      CREATE TABLE IF NOT EXISTS event_reviews (
        id SERIAL PRIMARY KEY,
        event_id INT NOT NULL,
        attendee_id INT NOT NULL,
        overall_rating INT NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
        venue_rating INT CHECK (venue_rating >= 1 AND venue_rating <= 5),
        organization_rating INT CHECK (organization_rating >= 1 AND organization_rating <= 5),
        value_for_money_rating INT CHECK (value_for_money_rating >= 1 AND value_for_money_rating <= 5),
        review_text TEXT,
        would_recommend BOOLEAN DEFAULT TRUE,
        review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id),
        FOREIGN KEY (attendee_id) REFERENCES attendees(id)
      );
      CREATE TABLE IF NOT EXISTS discount_codes (
        id SERIAL PRIMARY KEY,
        event_id INT NOT NULL,
        code VARCHAR(50) NOT NULL,
        description VARCHAR(200),
        discount_type VARCHAR(20) NOT NULL,
        discount_value DECIMAL(8,2) NOT NULL,
        minimum_tickets INT DEFAULT 1,
        usage_limit INT,
        used_count INT DEFAULT 0,
        valid_from TIMESTAMP,
        valid_until TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        UNIQUE (event_id, code)
      );
      CREATE TABLE IF NOT EXISTS attendees (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(15),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        role VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS apply (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      );
  `);

    console.log("Database setup completed.");
  } catch (err) {
    console.error("Connection error:", err.stack);
  } finally {
    await client.end();
  }
}

testConnection();