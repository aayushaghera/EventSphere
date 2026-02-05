import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

// GET ALL EVENTS
export async function getAllEvents(req, res) {
  const { category, city, date } = req.query;
  try {
    let query = `
      SELECT e.*, v.venue_name, v.city
      FROM events e
      JOIN venues v ON e.venue_id = v.id
      WHERE 1=1
    `;
    const params = [];
    if (category) {
      query += " AND e.event_category = $" + (params.length + 1);
      params.push(category);
    }
    if (city) {
      query += " AND v.city = $" + (params.length + 1);
      params.push(city);
    }
    if (date) {
      query += " AND DATE(e.start_datetime) = $" + (params.length + 1);
      params.push(date);
    }
    const result = await sql.unsafe(query, params);
    res.json(result);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
}

// GET EVENT BY ID
export async function getEventById(req, res) {
  try {
    const result = await sql`SELECT * FROM events WHERE id = ${req.params.id}`;
    res.json(result[0] || null);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
}

// CREATE EVENT
export async function createEvent(req, res) {
  const {
    organizer_id,
    venue_id,
    event_title,
    event_category,
    description,
    start_datetime,
    end_datetime,
    event_capacity,
  } = req.body;
  try {
    const result = await sql`
      INSERT INTO events 
        (organizer_id, venue_id, event_title, event_category, description, start_datetime, end_datetime, event_capacity) 
      VALUES 
        (${organizer_id}, ${venue_id}, ${event_title}, ${event_category}, ${description}, ${start_datetime}, ${end_datetime}, ${event_capacity})
      RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Event creation failed" });
  }
}

// UPDATE EVENT
export async function updateEvent(req, res) {
  const eventId = req.params.id;
  const userId = req.user.id;
  try {
    const event = await sql`SELECT * FROM events WHERE id = ${eventId}`;
    if (!event[0] || event[0].organizer_id !== userId) {
      return res.status(403).json({ error: "Access denied. Only organizer can update." });
    }
    const {
      event_title,
      event_category,
      description,
      start_datetime,
      end_datetime,
      event_capacity
    } = req.body;
    await sql`
      UPDATE events SET
        event_title = COALESCE(${event_title}, event_title),
        event_category = COALESCE(${event_category}, event_category),
        description = COALESCE(${description}, description),
        start_datetime = COALESCE(${start_datetime}, start_datetime),
        end_datetime = COALESCE(${end_datetime}, end_datetime),
        event_capacity = COALESCE(${event_capacity}, event_capacity)
      WHERE id = ${eventId}
    `;
    res.json({ message: "Event updated" });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Event update failed" });
  }
}

// DELETE EVENT
export async function deleteEvent(req, res) {
  const eventId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;
  try {
    const event = await sql`SELECT * FROM events WHERE id = ${eventId}`;
    if (!event[0]) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event[0].organizer_id !== userId && userRole !== "admin") {
      return res.status(403).json({ error: "Access denied. Only organizer or admin can delete." });
    }
    await sql`DELETE FROM events WHERE id = ${eventId}`;
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Event deletion failed" });
  }
}

// EVENT ANALYTICS
export async function getEventAnalytics(req, res) {
  const eventId = req.params.id;
  const userId = req.user.id;
  try {
    const event = await sql`SELECT * FROM events WHERE id = ${eventId}`;
    if (!event[0] || event[0].organizer_id !== userId) {
      return res.status(403).json({ error: "Access denied. Only organizer can view analytics." });
    }
    const stats = await sql`
      SELECT COUNT(*) AS tickets_sold, SUM(ticket_price) AS total_revenue
      FROM tickets WHERE ticket_type_id IN (
        SELECT id FROM ticket_types WHERE event_id = ${eventId}
      )
    `;
    res.json(stats[0]);
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
}