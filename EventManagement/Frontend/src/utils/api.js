// API configuration and utility functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Custom error class for role-based access control
export class RoleAccessError extends Error {
  constructor(message, statusCode = 403) {
    super(message);
    this.name = 'RoleAccessError';
    this.statusCode = statusCode;
  }
}

// Helper function to make API requests with enhanced error handling
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      // Handle role-based access errors
      if (response.status === 403) {
        throw new RoleAccessError(data.message || 'Access denied. Insufficient permissions.');
      }
      if (response.status === 401) {
        // Clear invalid token
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        throw new Error('Authentication required. Please login again.');
      }
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Role-based API request wrapper
export const roleBasedRequest = async (endpoint, options = {}, requiredRole = null) => {
  try {
    return await apiRequest(endpoint, options);
  } catch (error) {
    if (error instanceof RoleAccessError) {
      // Handle role access errors specifically
      throw new Error(`Access denied. This action requires ${requiredRole} privileges.`);
    }
    throw error;
  }
};

// Authentication API functions
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get user profile
  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Attendee-specific API functions
export const attendeeAPI = {
  // Get attendee profile (own profile only)
  getProfile: async (attendeeId) => {
    return roleBasedRequest(`/attendees/${attendeeId}`, {}, 'attendee');
  },

  // Update attendee profile
  updateProfile: async (attendeeId, profileData) => {
    return roleBasedRequest(`/attendees/${attendeeId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }, 'attendee');
  },

  // Get attendee bookings
  getBookings: async (attendeeId) => {
    return roleBasedRequest(`/attendees/${attendeeId}/bookings`, {}, 'attendee');
  },

  // Get attendee tickets
  getTickets: async (attendeeId) => {
    return roleBasedRequest(`/attendees/${attendeeId}/tickets`, {}, 'attendee');
  },

  // Book tickets
  bookTickets: async (ticketData) => {
    return roleBasedRequest('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    }, 'attendee');
  },
};

// Organizer-specific API functions
export const organizerAPI = {
  // Create event
  createEvent: async (eventData) => {
    return roleBasedRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }, 'organizer');
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    return roleBasedRequest(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }, 'organizer');
  },

  // Delete event
  deleteEvent: async (eventId) => {
    return roleBasedRequest(`/events/${eventId}`, {
      method: 'DELETE',
    }, 'organizer');
  },

  // Get event analytics
  getEventAnalytics: async (eventId) => {
    return roleBasedRequest(`/analytics/${eventId}`, {}, 'organizer');
  },

  // Create discount code
  createDiscount: async (discountData) => {
    return roleBasedRequest('/discounts', {
      method: 'POST',
      body: JSON.stringify(discountData),
    }, 'organizer');
  },

  // Get discount codes for event
  getDiscounts: async (eventId) => {
    return roleBasedRequest(`/discounts/event/${eventId}`, {}, 'organizer');
  },
};

// Venue Owner-specific API functions
export const venueOwnerAPI = {
  // Create venue
  createVenue: async (venueData) => {
    return roleBasedRequest('/venues', {
      method: 'POST',
      body: JSON.stringify(venueData),
    }, 'venue_owner');
  },

  // Update venue
  updateVenue: async (venueId, venueData) => {
    return roleBasedRequest(`/venues/${venueId}`, {
      method: 'PUT',
      body: JSON.stringify(venueData),
    }, 'venue_owner');
  },

  // Delete venue
  deleteVenue: async (venueId) => {
    return roleBasedRequest(`/venues/${venueId}`, {
      method: 'DELETE',
    }, 'venue_owner');
  },
};

// Admin-specific API functions
export const adminAPI = {
  // Get all users (admin only)
  getAllUsers: async () => {
    return roleBasedRequest('/admin/users', {}, 'admin');
  },

  // Get user by ID (admin only)
  getUserById: async (userId) => {
    return roleBasedRequest(`/admin/users/${userId}`, {}, 'admin');
  },

  // System configuration (admin only)
  getSystemConfig: async () => {
    return roleBasedRequest('/admin/config', {}, 'admin');
  },

  // Update system configuration (admin only)
  updateSystemConfig: async (configData) => {
    return roleBasedRequest('/admin/config', {
      method: 'PUT',
      body: JSON.stringify(configData),
    }, 'admin');
  },
};

// Public API functions (no authentication required)
export const publicAPI = {
  // Get all events
  getEvents: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/events${queryParams ? `?${queryParams}` : ''}`);
  },

  // Get event by ID
  getEventById: async (eventId) => {
    return apiRequest(`/events/${eventId}`);
  },

  // Get all venues
  getVenues: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/venues${queryParams ? `?${queryParams}` : ''}`);
  },

  // Get venue by ID
  getVenueById: async (venueId) => {
    return apiRequest(`/venues/${venueId}`);
  },

  // Get ticket types for event
  getTicketTypes: async (eventId) => {
    return apiRequest(`/tickets/event/${eventId}/ticket-types`);
  },
};

// Enhanced authentication state management
export const auth = {
  // Store authentication token
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  // Get authentication token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Remove authentication token
  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Store user data
  setUser: (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    // Backward compatibility
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', user.user_type);
  },

  // Get user data
  getUser: () => {
    const userData = localStorage.getItem('authUser');
    return userData ? JSON.parse(userData) : null;
  },

  // Get user role
  getUserRole: () => {
    const user = auth.getUser();
    return user?.user_type || null;
  },

  // Check if user has specific role
  hasRole: (role) => {
    return auth.getUserRole() === role;
  },

  // Check if user has any of the specified roles
  hasAnyRole: (roles) => {
    const userRole = auth.getUserRole();
    return roles.includes(userRole);
  },

  // Remove user data
  removeUser: () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
  },

  // Logout user (clear all auth data)
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
  },
};

export default apiRequest;