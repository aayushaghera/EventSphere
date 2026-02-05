import express from "express";
import { isAuthenticated, isAttendee, isAdminOrOwner } from "../middleware/auth.js";
import {
  getAttendeeProfile,
  updateAttendeeProfile,
  getAttendeeBookings,
  getAttendeeTickets
} from "../controllers/attendeesController.js";

const router = express.Router();

// GET ATTENDEE PROFILE - Only attendee can view their own profile or admin
router.get("/:id", isAuthenticated, isAdminOrOwner, getAttendeeProfile);
// UPDATE ATTENDEE PROFILE - Only attendee can update their own profile or admin
router.put("/:id", isAuthenticated, isAdminOrOwner, updateAttendeeProfile);
// GET ATTENDEE BOOKINGS - Only attendee can view their own bookings or admin
router.get("/:id/bookings", isAuthenticated, isAdminOrOwner, getAttendeeBookings);
// GET ATTENDEE TICKETS - Only attendee can view their own tickets or admin
router.get("/:id/tickets", isAuthenticated, isAdminOrOwner, getAttendeeTickets);

export default router;