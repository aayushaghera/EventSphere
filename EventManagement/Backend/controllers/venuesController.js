import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

// GET ALL VENUES
export async function getAllVenues(req, res) {
  const { city, capacity } = req.query;
  try {
    let query = "SELECT * FROM venues WHERE is_active = TRUE";
    const params = [];
    if (city) {
      query += " AND city = $1";
      params.push(city);
    }
    if (capacity) {
      query += params.length ? " AND capacity >= $2" : " AND capacity >= $1";
      params.push(capacity);
    }
    const venues = await sql.unsafe(query, params);
    res.json(venues);
  } catch (err) {
    console.error("Error fetching venues:", err);
    res.status(500).json({ error: "Failed to fetch venues" });
  }
}

// GET VENUE BY ID
export async function getVenueById(req, res) {
  const { id } = req.params;
  try {
    const venueArr = await sql`SELECT * FROM venues WHERE id = ${id}`;
    if (venueArr.length === 0) {
      return res.status(404).json({ error: "Venue not found" });
    }
    res.json(venueArr[0]);
  } catch (err) {
    console.error("Error fetching venue:", err);
    res.status(500).json({ error: "Failed to fetch venue" });
  }
}

// CREATE VENUE
export async function createVenue(req, res) {
  const venueData = req.body;
  try {
    const result = await sql`
      INSERT INTO venues (
        owner_id, venue_name, address, city, state, venue_type, capacity, hourly_rate, contact_person, contact_phone
      ) VALUES (
        ${venueData.owner_id}, ${venueData.venue_name}, ${venueData.address}, ${venueData.city}, ${venueData.state},
        ${venueData.venue_type}, ${venueData.capacity}, ${venueData.hourly_rate}, ${venueData.contact_person}, ${venueData.contact_phone}
      ) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    console.error("Error creating venue:", err);
    res.status(500).json({ error: "Venue creation failed" });
  }
}

// UPDATE VENUE
export async function updateVenue(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await sql`
      UPDATE venues SET 
        venue_name = ${updateData.venue_name || null},
        address = ${updateData.address || null},
        city = ${updateData.city || null},
        state = ${updateData.state || null},
        venue_type = ${updateData.venue_type || null},
        capacity = ${updateData.capacity || null},
        hourly_rate = ${updateData.hourly_rate || null},
        contact_person = ${updateData.contact_person || null},
        contact_phone = ${updateData.contact_phone || null}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Venue not found" });
    }
    res.json(result[0]);
  } catch (err) {
    console.error("Error updating venue:", err);
    res.status(500).json({ error: "Failed to update venue" });
  }
}

// DELETE VENUE
export async function deleteVenue(req, res) {
  const { id } = req.params;
  try {
    const result = await sql`
      DELETE FROM venues WHERE id = ${id} RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Venue not found" });
    }
    res.json({ message: "Venue deleted", venue: result[0] });
  } catch (err) {
    console.error("Error deleting venue:", err);
    res.status(500).json({ error: "Failed to delete venue" });
  }
}