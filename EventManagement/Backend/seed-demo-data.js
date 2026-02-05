import { getNeonConnection } from "./db.js";

const sql = getNeonConnection();

async function seedDemoData() {
  try {
    // Insert demo users
    await sql`
      INSERT INTO users (user_type, email, password_hash, full_name, phone, is_active)
      VALUES
        ('admin', 'admin@eventplatform.com', '$2b$12$hashed_password_here', 'Event Platform Administrator', '9999999999', TRUE),
        ('organizer', 'organizer@events.com', '$2b$12$hashed_password_here', 'Event Organizer', '9876543212', TRUE),
        ('attendee', 'attendee1@demo.com', '$2b$12$hashed_password_here', 'Demo Attendee One', '9876543213', TRUE),
        ('attendee', 'attendee2@demo.com', '$2b$12$hashed_password_here', 'Demo Attendee Two', '9876543214', TRUE),
        ('owner', 'owner@venue.com', '$2b$12$hashed_password_here', 'Venue Owner', '9876543215', TRUE)
    `;

    // Insert event organizer profile (assume user_id 2)
    await sql`
      INSERT INTO event_organizers (user_id, organization_name, organization_type, experience_years)
      VALUES (2, 'Premium Events Ltd', 'corporate', 5)
    `;

    // Insert sample venues (assume owner_id 5)
    await sql`
      INSERT INTO venues (owner_id, venue_name, address, city, state, venue_type, capacity, hourly_rate, contact_person, contact_phone, is_active)
      VALUES
        (5, 'Grand Convention Center', 'Satellite Road, Ahmedabad', 'Ahmedabad', 'Gujarat', 'conference_hall', 500, 5000.00, 'Venue Manager', '9876543210', TRUE),
        (5, 'City Auditorium', 'CG Road, Ahmedabad', 'Ahmedabad', 'Gujarat', 'auditorium', 1000, 8000.00, 'Facility Manager', '9876543211', TRUE)
    `;

    // Insert sample events (assume organizer_id 1, venue_id 1 and 2)
    await sql`
      INSERT INTO events (organizer_id, venue_id, event_title, event_category, description, start_datetime, end_datetime, event_capacity)
      VALUES
        (1, 1, 'Tech Conference 2024', 'conference', 'Annual technology conference featuring latest innovations', '2024-12-15 09:00:00', '2024-12-15 18:00:00', 300),
        (1, 2, 'Cultural Festival', 'cultural', 'Celebration of local arts and culture', '2024-12-20 16:00:00', '2024-12-20 22:00:00', 800)
    `;

    // Insert attendees (assume user_id 3 and 4)
    await sql`
      INSERT INTO attendees (user_id, date_of_birth, preferred_event_types, total_events_attended, loyalty_points, notification_preferences, emergency_contact_name, emergency_contact_phone)
      VALUES
        (3, '2000-01-01', 'conference,cultural', 2, 100, '{"email":true,"sms":false}', 'Parent One', '9123456789'),
        (4, '1998-05-10', 'cultural', 1, 50, '{"email":true,"sms":true}', 'Parent Two', '9123456790')
    `;

    // Insert bookings (assume event_id 1, attendee_id 1 and 2)
    await sql`
      INSERT INTO bookings (booking_id, event_id, attendee_id, total_tickets, subtotal_amount, discount_amount, tax_amount, total_amount, booking_status, payment_status, payment_method, transaction_id, discount_code)
      VALUES
        ('BK001', 1, 1, 2, 1000.00, 100.00, 50.00, 950.00, 'confirmed', 'paid', 'credit_card', 'TXN123456', 'DISC10'),
        ('BK002', 1, 2, 1, 500.00, 0.00, 25.00, 525.00, 'confirmed', 'paid', 'debit_card', 'TXN123457', NULL)
    `;

    console.log("Demo data seeded successfully.");
  } catch (err) {
    console.error("Error seeding demo data:", err);
  }
}

seedDemoData();
