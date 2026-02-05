import express from "express";
import { healthCheck } from "../controllers/healthController.js";

const router = express.Router();

router.get('/api/health', healthCheck);

export default router;