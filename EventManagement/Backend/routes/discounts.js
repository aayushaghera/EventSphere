import express from "express";
import { isAuthenticated, isOrganizer } from "../middleware/auth.js";
import {
  getDiscountCodesForEvent,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode
} from "../controllers/discountsController.js";

const router = express.Router();

// GET ALL DISCOUNT CODES FOR EVENT - Organizers only (for their events)
router.get("/event/:eventId", isAuthenticated, isOrganizer, getDiscountCodesForEvent);
// CREATE DISCOUNT CODE (Organizer Only)
router.post("/", isAuthenticated, isOrganizer, createDiscountCode);
// UPDATE DISCOUNT CODE (Organizer Only)
router.put("/:id", isAuthenticated, isOrganizer, updateDiscountCode);
// DELETE DISCOUNT CODE (Organizer Only)
router.delete("/:id", isAuthenticated, isOrganizer, deleteDiscountCode);

export default router;