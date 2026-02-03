import jwt from "jsonwebtoken";

// check if user is logged in
export const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // for token

  if (!token) {
    return res.status(401).json({ message: "No token provided, please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to req
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// check if user is Admin
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

// check if user is Attendee
export const isAttendee = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  if (req.user.role !== "attendee") {
    return res.status(403).json({ message: "Access denied. Attendees only." });
  }

  next();
};

// check if user is Organizer
export const isOrganizer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  if (req.user.role !== "organizer") {
    return res.status(403).json({ message: "Access denied. Organizers only." });
  }

  next();
};

// check if user is Venue Owner
export const isVenueOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  if (req.user.role !== "venue_owner") {
    return res.status(403).json({ message: "Access denied. Venue owners only." });
  }

  next();
};

// check if user is Admin or the owner of the resource
export const isAdminOrOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  // Allow if user is admin
  if (req.user.role === "admin") {
    return next();
  }

  // Allow if user is the owner of the resource (based on user ID in params)
  if (req.params.id && req.user.id === parseInt(req.params.id)) {
    return next();
  }

  return res.status(403).json({ message: "Access denied. Insufficient permissions." });
};

// check if user is Admin or Organizer (for moderation features)
export const isAdminOrOrganizer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  if (req.user.role !== "admin" && req.user.role !== "organizer") {
    return res.status(403).json({ message: "Access denied. Admins or Organizers only." });
  }

  next();
};

// check if user has elevated privileges (Admin, Organizer, or Venue Owner)
export const hasElevatedAccess = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  const elevatedRoles = ["admin", "organizer", "venue_owner"];
  if (!elevatedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Insufficient privileges." });
  }

  next();
};