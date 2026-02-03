import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getNeonConnection } from "../db.js";
import { registerSchema, loginSchema, profileUpdateSchema } from "../utils/validators.js";

const sql = getNeonConnection();

// JWT middleware
export function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Token required" });
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: "Invalid token" });
		req.user = user;
		next();
	});
}

// REGISTER controller
export async function register(req, res) {
	const { error } = registerSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	const { email, password, full_name, user_type, phone } = req.body;
	try {
		const commonPasswords = [
			"password123",
			"admin",
			"12345678",
			"qwerty",
			"letmein",
		];
		if (commonPasswords.includes(password.toLowerCase())) {
			return res.status(400).json({ error: "Password is too common" });
		}
		const disposableDomains = [
			"tempmail.com",
			"10minutemail.com",
			"mailinator.com",
			"guerrillamail.com",
		];
		const emailDomain = email.split("@")[1];
		if (disposableDomains.some((domain) => emailDomain.endsWith(domain))) {
			return res.status(400).json({ error: "Disposable email addresses are not allowed" });
		}
		const hashed = await bcrypt.hash(password, 10);
		const result = await sql`
			INSERT INTO users (email, password_hash, full_name, user_type, phone)
			VALUES (${email}, ${hashed}, ${full_name}, ${user_type}, ${phone})
			RETURNING id, email, user_type
		`;
		res.json(result[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Registration failed" });
	}
}

// LOGIN controller
export async function login(req, res) {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	const { email, password } = req.body;
	try {
		const users = await sql`SELECT * FROM users WHERE email = ${email}`;
		if (users.length === 0) {
			return res.status(400).json({ error: "Invalid email" });
		}
		const user = users[0];
		const valid = await bcrypt.compare(password, user.password_hash);
		if (!valid) {
			return res.status(400).json({ error: "Invalid password" });
		}
		const token = jwt.sign(
			{ id: user.id, role: user.user_type },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);
		res.json({ token, user });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Login failed" });
	}
}

// PROFILE GET controller
export async function getProfile(req, res) {
	try {
		const userId = req.user.id;
		
		// Get user basic info and extended profile in one query
		const users = await sql`
			SELECT 
				u.id, u.email, u.full_name, u.user_type, u.phone, u.created_at,
				p.bio, p.company, p.job_title, p.location, p.website, p.linkedin,
				p.profile_image_url, p.date_of_birth, p.preferred_communication,
				p.newsletter_subscribed
			FROM users u
			LEFT JOIN user_profiles p ON u.id = p.user_id
			WHERE u.id = ${userId}
		`;
		
		if (users.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		
		const user = users[0];
		
		// If no profile exists, create one
		if (!user.bio && !user.company && !user.job_title) {
			await sql`
				INSERT INTO user_profiles (user_id) 
				VALUES (${userId})
				ON CONFLICT (user_id) DO NOTHING
			`;
		}
		
		// Format the response to match frontend expectations
		const profile = {
			id: user.id,
			email: user.email,
			full_name: user.full_name,
			user_type: user.user_type,
			phone: user.phone,
			created_at: user.created_at,
			bio: user.bio,
			company: user.company,
			job_title: user.job_title,
			location: user.location,
			website: user.website,
			linkedin: user.linkedin,
			profile_image_url: user.profile_image_url,
			date_of_birth: user.date_of_birth,
			preferred_communication: user.preferred_communication || 'email',
			newsletter_subscribed: user.newsletter_subscribed || false
		};
		
		res.json(profile);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch profile" });
	}
}

// PROFILE UPDATE controller
export async function updateProfile(req, res) {
	// Validate request body
	const { error } = profileUpdateSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const { 
		full_name, 
		phone, 
		bio, 
		company, 
		job_title, 
		location, 
		website, 
		linkedin,
		date_of_birth,
		preferred_communication,
		newsletter_subscribed
	} = req.body;

	try {
		const userId = req.user.id;
		
		// Update basic user info
		if (full_name || phone) {
			await sql`
				UPDATE users 
				SET 
					full_name = COALESCE(${full_name}, full_name), 
					phone = COALESCE(${phone}, phone),
					updated_at = CURRENT_TIMESTAMP
				WHERE id = ${userId}
			`;
		}
		
		// Update extended profile info
		const profileFields = {
			bio, company, job_title, location, website, linkedin,
			date_of_birth, preferred_communication, newsletter_subscribed
		};
		
		// Filter out undefined values
		const updates = Object.fromEntries(
			Object.entries(profileFields).filter(([_, value]) => value !== undefined)
		);
		
		if (Object.keys(updates).length > 0) {
			// First ensure a profile record exists
			await sql`
				INSERT INTO user_profiles (user_id) 
				VALUES (${userId})
				ON CONFLICT (user_id) DO NOTHING
			`;
			
			// Then update it
			await sql`
				UPDATE user_profiles 
				SET 
					bio = COALESCE(${updates.bio}, bio),
					company = COALESCE(${updates.company}, company),
					job_title = COALESCE(${updates.job_title}, job_title),
					location = COALESCE(${updates.location}, location),
					website = COALESCE(${updates.website}, website),
					linkedin = COALESCE(${updates.linkedin}, linkedin),
					date_of_birth = COALESCE(${updates.date_of_birth}, date_of_birth),
					preferred_communication = COALESCE(${updates.preferred_communication}, preferred_communication),
					newsletter_subscribed = COALESCE(${updates.newsletter_subscribed}, newsletter_subscribed),
					updated_at = CURRENT_TIMESTAMP
				WHERE user_id = ${userId}
			`;
		}
		
		res.json({ message: "Profile updated successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update profile" });
	}
}