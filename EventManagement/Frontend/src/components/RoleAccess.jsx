import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle, ShieldX } from 'lucide-react';

// Role-based access wrapper component
export const RoleAccessWrapper = ({ 
  children, 
  allowedRoles = [], 
  requireOwnership = false, 
  resourceUserId = null,
  fallbackMessage = null 
}) => {
  const { hasAnyRole, canAccessResource, getUserRole, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShieldX className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access this content.</p>
        </div>
      </div>
    );
  }

  // Check role access
  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-4">
            {fallbackMessage || `This content is restricted to ${allowedRoles.join(', ')} users only.`}
          </p>
          <p className="text-sm text-gray-500">
            Your current role: <span className="font-medium">{getUserRole()}</span>
          </p>
        </div>
      </div>
    );
  }

  // Check resource ownership if required
  if (requireOwnership && resourceUserId && !canAccessResource(resourceUserId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShieldX className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You can only access your own resources.</p>
        </div>
      </div>
    );
  }

  return children;
};

// Attendee-only wrapper
export const AttendeeOnly = ({ children, ...props }) => (
  <RoleAccessWrapper 
    allowedRoles={['attendee']} 
    fallbackMessage="This section is for attendees only."
    {...props}
  >
    {children}
  </RoleAccessWrapper>
);

// Organizer-only wrapper
export const OrganizerOnly = ({ children, ...props }) => (
  <RoleAccessWrapper 
    allowedRoles={['organizer']} 
    fallbackMessage="This section is for event organizers only."
    {...props}
  >
    {children}
  </RoleAccessWrapper>
);

// Venue Owner-only wrapper
export const VenueOwnerOnly = ({ children, ...props }) => (
  <RoleAccessWrapper 
    allowedRoles={['venue_owner']} 
    fallbackMessage="This section is for venue owners only."
    {...props}
  >
    {children}
  </RoleAccessWrapper>
);

// Admin-only wrapper
export const AdminOnly = ({ children, ...props }) => (
  <RoleAccessWrapper 
    allowedRoles={['admin']} 
    fallbackMessage="This section is for administrators only."
    {...props}
  >
    {children}
  </RoleAccessWrapper>
);

// Multiple roles wrapper
export const MultiRoleAccess = ({ children, roles, ...props }) => (
  <RoleAccessWrapper 
    allowedRoles={roles} 
    fallbackMessage={`This section is restricted to ${roles.join(', ')} users.`}
    {...props}
  >
    {children}
  </RoleAccessWrapper>
);

// Owner or Admin access wrapper (for resource-specific access)
export const OwnerOrAdminAccess = ({ children, resourceUserId, ...props }) => (
  <RoleAccessWrapper 
    allowedRoles={['admin']} 
    requireOwnership={true}
    resourceUserId={resourceUserId}
    fallbackMessage="You can only access your own resources or admin access is required."
    {...props}
  >
    {children}
  </RoleAccessWrapper>
);

// Conditional role-based rendering hook
export const useRoleAccess = () => {
  const { hasRole, hasAnyRole, canAccessResource, getUserRole } = useAuth();

  return {
    hasRole,
    hasAnyRole,
    canAccessResource,
    getUserRole,
    isAttendee: () => hasRole('attendee'),
    isOrganizer: () => hasRole('organizer'),
    isVenueOwner: () => hasRole('venue_owner'),
    isAdmin: () => hasRole('admin'),
    canModerate: () => hasAnyRole(['admin', 'organizer']),
    hasElevatedAccess: () => hasAnyRole(['admin', 'organizer', 'venue_owner'])
  };
};