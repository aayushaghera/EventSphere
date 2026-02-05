import { getNeonConnection } from "../db.js";

const sql = getNeonConnection();

// BOOK TICKETS
export async function bookTickets(req, res) {
  const {
    event_id,
    attendee_id,
    ticket_type_id,
    quantity,
    attendee_details = [],
    discount_code,
    booking_date = new Date()
  } = req.body;
  try {
    const ticketTypeArr = await sql`SELECT * FROM ticket_types WHERE id = ${ticket_type_id}`;
    if (ticketTypeArr.length === 0) {
      return res.status(400).json({ error: "Invalid ticket type" });
    }
    const ticketType = ticketTypeArr[0];
    let basePrice = ticketType.price * quantity;
    let totalPrice = basePrice;
    let discountAmount = 0;
    if (ticketType.early_bird_deadline && new Date(booking_date) <= new Date(ticketType.early_bird_deadline)) {
      totalPrice *= (1 - Number(ticketType.early_bird_discount || 0));
    }
    if (quantity >= Number(ticketType.group_minimum || 0)) {
      totalPrice *= (1 - Number(ticketType.group_discount || 0));
    }
    let discountCodeObj = null;
    if (discount_code) {
      const codeArr = await sql`SELECT * FROM discount_codes WHERE code = ${discount_code} AND event_id = ${event_id} AND is_active = TRUE`;
      if (codeArr.length > 0) {
        discountCodeObj = codeArr[0];
        totalPrice *= (1 - Number(discountCodeObj.discount_value || 0) / 100);
      }
    }
    discountAmount = basePrice - totalPrice;
    const taxAmount = totalPrice * 0.18;
    const finalAmount = totalPrice + taxAmount;
    const bookingRes = await sql`
      INSERT INTO bookings (
        booking_id, event_id, attendee_id, total_tickets, subtotal_amount, discount_amount, tax_amount, total_amount, discount_code
      ) VALUES (
        CONCAT('BKG', EXTRACT(EPOCH FROM NOW())),
        ${event_id}, ${attendee_id}, ${quantity}, ${basePrice}, ${discountAmount}, ${taxAmount}, ${finalAmount}, ${discount_code || null}
      )
      RETURNING *
    `;
    const booking = bookingRes[0];
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const attendee = attendee_details[i] || {};
      const ticketRes = await sql`
        INSERT INTO tickets (
          booking_id, ticket_type_id, ticket_number, attendee_name, attendee_email, attendee_phone, ticket_price
        ) VALUES (
          ${booking.id}, ${ticket_type_id}, CONCAT('TKT', EXTRACT(EPOCH FROM NOW()), '-', ${i+1}),
          ${attendee.name || null}, ${attendee.email || null}, ${attendee.phone || null}, ${ticketType.price}
        )
        RETURNING *
      `;
      tickets.push(ticketRes[0]);
    }
    res.json({
      message: "Booking successful",
      booking,
      tickets,
      pricing: {
        basePrice,
        discountAmount,
        taxAmount,
        finalAmount
      }
    });
  } catch (err) {
    console.error("Error booking ticket:", err);
    res.status(500).json({ error: "Booking failed" });
  }
}

// GET TICKET TYPES FOR EVENT
export async function getTicketTypesForEvent(req, res) {
  const { eventId } = req.params;
  try {
    const ticketTypes = await sql`SELECT * FROM ticket_types WHERE event_id = ${eventId} AND is_active = TRUE`;
    res.json(ticketTypes);
  } catch (err) {
    console.error("Error fetching ticket types:", err);
    res.status(500).json({ error: "Failed to fetch ticket types" });
  }
}

// CHECK-IN TICKET
export async function checkInTicket(req, res) {
  const { id } = req.params;
  try {
    const result = await sql`
      UPDATE tickets SET check_in_status = 'checked_in', check_in_time = NOW() WHERE id = ${id} RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json({ message: "Check-in successful", ticket: result[0] });
  } catch (err) {
    console.error("Error checking in ticket:", err);
    res.status(500).json({ error: "Failed to check-in ticket" });
  }
}

// GET TICKET DETAILS
export async function getTicketDetails(req, res) {
  const { ticketNumber } = req.params;
  try {
    const ticketArr = await sql`SELECT * FROM tickets WHERE ticket_number = ${ticketNumber}`;
    if (ticketArr.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    const ticket = ticketArr[0];
    res.json(ticket);
  } catch (err) {
    console.error("Error fetching ticket details:", err);
    res.status(500).json({ error: "Failed to fetch ticket details" });
  }
}

// CANCEL BOOKING
export async function cancelBooking(req, res) {
  const { id } = req.params;
  try {
    const result = await sql`
      UPDATE bookings SET booking_status = 'cancelled' WHERE id = ${id} RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking cancelled", booking: result[0] });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
}

// GET BOOKING DETAILS
export async function getBookingDetails(req, res) {
  const { id } = req.params;
  try {
    const bookingArr = await sql`SELECT * FROM bookings WHERE id = ${id}`;
    if (bookingArr.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const booking = bookingArr[0];
    const tickets = await sql`SELECT * FROM tickets WHERE booking_id = ${id}`;
    const attendeeArr = await sql`SELECT * FROM attendees WHERE id = ${booking.attendee_id}`;
    const attendee = attendeeArr[0] || null;
    res.json({ booking, tickets, attendee });
  } catch (err) {
    console.error("Error fetching booking details:", err);
    res.status(500).json({ error: "Failed to fetch booking details" });
  }
}