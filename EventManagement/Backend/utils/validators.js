import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const registerSchema = Joi.object({
  user_type: Joi.string().valid('organizer','venue_owner','attendee','admin').required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required(),
  full_name: Joi.string().min(1).max(100).required(),
  phone: Joi.string().pattern(/^\d{10}$/).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const profileUpdateSchema = Joi.object({
  full_name: Joi.string().min(1).max(100).optional(),
  phone: Joi.string().pattern(/^\d{10}$/).optional(),
  bio: Joi.string().max(1000).optional(),
  company: Joi.string().max(100).optional(),
  job_title: Joi.string().max(100).optional(),
  location: Joi.string().max(100).optional(),
  website: Joi.string().uri().optional(),
  linkedin: Joi.string().max(255).optional(),
  date_of_birth: Joi.date().max('now').optional(),
  preferred_communication: Joi.string().valid('email', 'sms', 'both').optional(),
  newsletter_subscribed: Joi.boolean().optional()
});

export { registerSchema, loginSchema, profileUpdateSchema };