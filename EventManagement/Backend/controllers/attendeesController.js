import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

// GET ATTENDEE PROFILE
export async function getAttendeeProfile(req, res) {
  const { id } = req.params;
  try {
    const attendeeArr = await sql`SELECT * FROM attendees WHERE id = ${id}`;
    if (attendeeArr.length === 0) {
      return res.status(404).json({ error: "Attendee not found" });
    }
    res.json(attendeeArr[0]);
  } catch (err) {
    console.error("Error fetching attendee profile:", err);
    res.status(500).json({ error: "Failed to fetch attendee profile" });
  }
}

// UPDATE ATTENDEE PROFILE
export async function updateAttendeeProfile(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await sql`
      UPDATE attendees SET 
        date_of_birth = ${updateData.date_of_birth || null},
        preferred_event_types = ${updateData.preferred_event_types || null},
        notification_preferences = ${updateData.notification_preferences || null},
        emergency_contact_name = ${updateData.emergency_contact_name || null},
        emergency_contact_phone = ${updateData.emergency_contact_phone || null}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Attendee not found" });
    }
    res.json(result[0]);
  } catch (err) {
    console.error("Error updating attendee profile:", err);
    res.status(500).json({ error: "Failed to update attendee profile" });
  }
}

// GET ATTENDEE BOOKINGS
export async function getAttendeeBookings(req, res) {
  const { id } = req.params;
  try {
    const bookings = await sql`SELECT * FROM bookings WHERE attendee_id = ${id}`;
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching attendee bookings:", err);
    res.status(500).json({ error: "Failed to fetch attendee bookings" });
  }
}

// GET ATTENDEE TICKETS
export async function getAttendeeTickets(req, res) {
  const { id } = req.params;
  try {
    const tickets = await sql`
      SELECT t.* FROM tickets t
      JOIN bookings b ON t.booking_id = b.id
      WHERE b.attendee_id = ${id}
    `;
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching attendee tickets:", err);
    res.status(500).json({ error: "Failed to fetch attendee tickets" });
  }
}