import express from "express";
import { isAuthenticated, isAttendee, isOrganizer, isAdminOrOwner } from "../middleware/auth.js";
import {
  bookTickets,
  getTicketTypesForEvent,
  checkInTicket,
  getTicketDetails,
  cancelBooking,
  getBookingDetails
} from "../controllers/ticketsController.js";

const router = express.Router();

// BOOK TICKETS - Attendees only
router.post("/", isAuthenticated, isAttendee, bookTickets);
// GET TICKET TYPES FOR EVENT - Public access
router.get("/event/:eventId/ticket-types", getTicketTypesForEvent);
// CHECK-IN TICKET - Organizers only (for their events)
router.put("/tickets/:id/check-in", isAuthenticated, isOrganizer, checkInTicket);
// GET TICKET DETAILS - Attendee (own tickets) or Admin
router.get("/tickets/:ticketNumber", isAuthenticated, getTicketDetails);
// CANCEL BOOKING - Attendee (own bookings) or Admin
router.put("/bookings/:id/cancel", isAuthenticated, cancelBooking);
// GET BOOKING DETAILS - Attendee (own bookings) or Admin
router.get("/bookings/:id", isAuthenticated, getBookingDetails);
export default router;