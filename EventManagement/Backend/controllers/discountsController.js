import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

// GET ALL DISCOUNT CODES FOR EVENT
export async function getDiscountCodesForEvent(req, res) {
  const { eventId } = req.params;
  try {
    const codes = await sql`SELECT * FROM discount_codes WHERE event_id = ${eventId}`;
    res.json(codes);
  } catch (err) {
    console.error("Error fetching discount codes:", err);
    res.status(500).json({ error: "Failed to fetch discount codes" });
  }
}

// CREATE DISCOUNT CODE (Organizer Only)
export async function createDiscountCode(req, res) {
  if (req.user.role !== "organizer") {
    return res.status(403).json({ error: "Access denied. Organizers only." });
  }
  const codeData = req.body;
  try {
    const result = await sql`
      INSERT INTO discount_codes (
        event_id, code, description, discount_type, discount_value, minimum_tickets, usage_limit, valid_from, valid_until, is_active
      ) VALUES (
        ${codeData.event_id}, ${codeData.code}, ${codeData.description}, ${codeData.discount_type}, ${codeData.discount_value},
        ${codeData.minimum_tickets || 1}, ${codeData.usage_limit || null}, ${codeData.valid_from || null}, ${codeData.valid_until || null}, true
      ) RETURNING *
    `;
    res.json(result[0]);
  } catch (err) {
    console.error("Error creating discount code:", err);
    res.status(500).json({ error: "Discount code creation failed" });
  }
}

// UPDATE DISCOUNT CODE (Organizer Only)
export async function updateDiscountCode(req, res) {
  if (req.user.role !== "organizer") {
    return res.status(403).json({ error: "Access denied. Organizers only." });
  }
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await sql`
      UPDATE discount_codes SET 
        code = ${updateData.code || null},
        description = ${updateData.description || null},
        discount_type = ${updateData.discount_type || null},
        discount_value = ${updateData.discount_value || null},
        minimum_tickets = ${updateData.minimum_tickets || null},
        usage_limit = ${updateData.usage_limit || null},
        valid_from = ${updateData.valid_from || null},
        valid_until = ${updateData.valid_until || null},
        is_active = ${updateData.is_active}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Discount code not found" });
    }
    res.json(result[0]);
  } catch (err) {
    console.error("Error updating discount code:", err);
    res.status(500).json({ error: "Failed to update discount code" });
  }
}

// DELETE DISCOUNT CODE (Organizer Only)
export async function deleteDiscountCode(req, res) {
  if (req.user.role !== "organizer") {
    return res.status(403).json({ error: "Access denied. Organizers only." });
  }
  const { id } = req.params;
  try {
    const result = await sql`
      DELETE FROM discount_codes WHERE id = ${id} RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Discount code not found" });
    }
    res.json({ message: "Discount code deleted", code: result[0] });
  } catch (err) {
    console.error("Error deleting discount code:", err);
    res.status(500).json({ error: "Failed to delete discount code" });
  }
}