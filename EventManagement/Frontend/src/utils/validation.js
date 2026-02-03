// Form validation utilities

// Password validation regex - at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (10 digits)
const phoneRegex = /^\d{10}$/;

export const validators = {
  email: (email) => {
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  },

  password: (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!passwordRegex.test(password)) {
      return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
    }
    return null;
  },

  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  },

  fullName: (name) => {
    if (!name) return 'Full name is required';
    if (name.length < 2) return 'Full name must be at least 2 characters long';
    if (name.length > 100) return 'Full name must be less than 100 characters';
    return null;
  },

  phone: (phone) => {
    if (!phone) return null; // Phone is optional
    if (!phoneRegex.test(phone)) return 'Phone number must be exactly 10 digits';
    return null;
  },

  userType: (userType) => {
    const validTypes = ['attendee', 'organizer', 'venue_owner', 'admin'];
    if (!userType) return 'User type is required';
    if (!validTypes.includes(userType)) return 'Invalid user type';
    return null;
  }
};

// Validate entire form
export const validateRegistrationForm = (formData) => {
  const errors = {};

  const emailError = validators.email(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validators.password(formData.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validators.confirmPassword(formData.password, formData.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  const nameError = validators.fullName(formData.name);
  if (nameError) errors.name = nameError;

  const phoneError = validators.phone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const userTypeError = validators.userType(formData.userType);
  if (userTypeError) errors.userType = userTypeError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validators.email(formData.email);
  if (emailError) errors.email = emailError;

  if (!formData.password) errors.password = 'Password is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};