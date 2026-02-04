import express from "express";
const router = express.Router();
import { isAuthenticated, isOrganizer } from "../middleware/auth.js";
import { getEventAnalytics } from "../controllers/analyticsController.js";


// EVENT ANALYTICS - Organizers only
router.get("/:eventId", isAuthenticated, isOrganizer, getEventAnalytics);

export default router;