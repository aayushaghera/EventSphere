import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, hasAnyRole, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Role-based Route Component
export const RoleRoute = ({ children, role }) => {
  return (
    <ProtectedRoute allowedRoles={[role]}>
      {children}
    </ProtectedRoute>
  );
};

// Admin Only Route
export const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      {children}
    </ProtectedRoute>
  );
};

// Attendee Only Route
export const AttendeeRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={['attendee']}>
      {children}
    </ProtectedRoute>
  );
};

// Organizer Only Route
export const OrganizerRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      {children}
    </ProtectedRoute>
  );
};

// Venue Owner Only Route
export const VenueOwnerRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={['venue_owner']}>
      {children}
    </ProtectedRoute>
  );
};

// Multiple Roles Route
export const MultiRoleRoute = ({ children, roles }) => {
  return (
    <ProtectedRoute allowedRoles={roles}>
      {children}
    </ProtectedRoute>
  );
};

// Public Route (no authentication required)
export const PublicRoute = ({ children }) => {
  return (
    <ProtectedRoute requireAuth={false}>
      {children}
    </ProtectedRoute>
  );
};

// Redirect based on user role
export const RoleBasedRedirect = () => {
  const { getUserRole, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  const role = getUserRole();
  switch (role) {
    case 'admin':
      return <Navigate to="/admin/overview" replace />;
    case 'organizer':
      return <Navigate to="/event-manager/dashboard" replace />;
    case 'venue_owner':
      return <Navigate to="/venue/dashboard" replace />;
    case 'attendee':
      return <Navigate to="/attendee/book-ticket" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};