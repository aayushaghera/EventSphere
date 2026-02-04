import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

// EVENT ANALYTICS controller
export async function getEventAnalytics(req, res) {
  const { eventId } = req.params;
  try {
    // Total tickets sold and revenue
    const sales = await sql`
      SELECT 
        SUM(total_tickets) AS tickets_sold, 
        SUM(total_amount) AS revenue
      FROM bookings
      WHERE event_id = ${eventId} AND booking_status = 'confirmed'
    `;
    // Total attendees
    const attendees = await sql`
      SELECT COUNT(*) AS attendees
      FROM tickets
      WHERE ticket_type_id IN (
        SELECT id FROM ticket_types WHERE event_id = ${eventId}
      )
    `;
    res.json({ sales: sales[0], attendees: attendees[0] });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ error: "Analytics fetch failed" });
  }
}