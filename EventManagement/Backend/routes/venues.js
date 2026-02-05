import express from "express";
import { isAuthenticated, isVenueOwner } from "../middleware/auth.js";
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue
} from "../controllers/venuesController.js";

const router = express.Router();

// GET ALL VENUES - Public access
router.get("/", getAllVenues);
// GET VENUE BY ID - Public access
router.get("/:id", getVenueById);
// CREATE VENUE (Venue Owner Only)
router.post("/", isAuthenticated, isVenueOwner, createVenue);
// UPDATE VENUE (Venue Owner Only)
router.put("/:id", isAuthenticated, isVenueOwner, updateVenue);
// DELETE VENUE (Venue Owner Only)
router.delete("/:id", isAuthenticated, isVenueOwner, deleteVenue);

export default router;