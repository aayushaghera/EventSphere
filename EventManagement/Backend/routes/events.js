import express from "express";
import { isAuthenticated, isAdmin, isOrganizer } from "../middleware/auth.js";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventAnalytics
} from "../controllers/eventsController.js";

const router = express.Router();

// GET ALL EVENTS - Public access
router.get("/", getAllEvents);
// GET EVENT BY ID - Public access
router.get("/:id", getEventById);
// CREATE EVENT - Organizers only
router.post("/", isAuthenticated, isOrganizer, createEvent);
// UPDATE EVENT - Organizers only (should check if organizer owns the event)
router.put("/:id", isAuthenticated, isOrganizer, updateEvent);
// DELETE EVENT - Organizers only (should check if organizer owns the event) or Admin
router.delete("/:id", isAuthenticated, isOrganizer, deleteEvent);
// EVENT ANALYTICS - Organizers only (should check if organizer owns the event)
router.get("/:id/analytics", isAuthenticated, isOrganizer, getEventAnalytics);

export default router;