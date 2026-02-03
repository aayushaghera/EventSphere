import express from "express";
import { authenticateToken, register, login, getProfile, updateProfile } from "../controllers/authController.js";

const router = express.Router();
// REGISTER
router.post("/register", register);
// LOGIN
router.post("/login", login);
// PROFILE
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);
export default router;