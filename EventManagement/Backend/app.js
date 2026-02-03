import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import ticketRoutes from "./routes/tickets.js";
import analyticsRoutes from "./routes/analytics.js";
import venueRoutes from "./routes/venues.js";
import attendeeRoutes from "./routes/attendees.js";
import discountRoutes from "./routes/discounts.js";
import healthRoutes from "./routes/health.js";
import { getNeonConnection } from "./db.js";
const sql = getNeonConnection();
const app = express();


app.use(cors());
app.use(bodyParser.json());

// Test DB connection
const result = await sql`SELECT version()`;
console.log(result);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/health", healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));