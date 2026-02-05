import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { 
  ProtectedRoute, 
  AdminRoute, 
  AttendeeRoute, 
  OrganizerRoute, 
  VenueOwnerRoute,
  PublicRoute,
  RoleBasedRedirect
} from '../components/ProtectedRoute';

import Layout from '../components/Layout/Layout';
import HomePage from '../pages/Home/HomePage';
import EventsPage from '../pages/Events/EventsPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import NotFoundPage from '../pages/ErrorPages/NotFoundPage';
import UnauthorizedPage from '../pages/ErrorPages/UnauthorizedPage';
import LoginPage from '../pages/Auth/LoginPage';

// Venue Owner Components
import VenueLayout from '../pages/Venues/VenueLayout';
import DashBoard from '../pages/Venues/DashBoard';
import BookingCalendar from '../pages/Venues/BookingCalendar';
import BookingAnalytics from '../pages/Venues/BookingAnalytics';
import FacilityManagement from '../pages/Venues/FacilityManagement';
import ClientCommunication from '../pages/Venues/ClientCommunication';
import VenueOwnerDashboard from '../pages/Venues/VenueOwnerDashboard';

// Organizer Components
import EventLayout from '../pages/Organizer/EventLayout';
import Dashboard from '../pages/Organizer/Dashboard';
import Ticketing from '../pages/Organizer/Ticketing';
import Marketing from '../pages/Organizer/Marketing';
import AttendeesManagement from '../pages/Organizer/AttendeeManagement';
import Analytics from '../pages/Organizer/Analytics';
import EventManagementPlatform from '../pages/Events/EventManagementPlatform';
import EventManagementApp from '../pages/Organizer/EventManagementApp';

// Attendee Components
import AttendeeLayout from '../pages/Attendees/AttendeeLayout';
import TicketBookingPage from '../pages/Attendees/TicketBookingPage';
import MyBookingsPage from '../pages/Attendees/MyBookingsPage';
import CheckInPage from '../pages/Attendees/CheckInPage';
import ProfilePage from '../pages/Attendees/ProfilePage';
import FeedbackPage from '../pages/Attendees/FeedBackPage';

// Admin Components
import AdminLayout from '../pages/Admin/AdminLayout';
import PlatformOverview from '../pages/Admin/PlatformOverview';
import UserManagement from '../pages/Admin/UserManagement';
import EventModeration from '../pages/Admin/EventModeration';
import AnalyticsReports from '../pages/Admin/AnalyticsReports';
import SystemConfiguration from '../pages/Admin/SystemConfiguration';

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/auth/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/auth/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/auth/*" element={<Navigate to="/auth/login" replace />} />

          {/* Public Routes */}
          <Route path="/" element={<PublicRoute><Layout /></PublicRoute>}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
          </Route>

          {/* Role-based Dashboard Redirect */}
          <Route path="/dashboard" element={<RoleBasedRedirect />} />

          {/* Venue Owner Routes - Protected */}
          <Route path="/venue" element={
            <VenueOwnerRoute>
              <VenueLayout />
            </VenueOwnerRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="calendar" element={<BookingCalendar />} />
            <Route path="analytics" element={<BookingAnalytics />} />
            <Route path="management" element={<FacilityManagement />} />
            <Route path="communication" element={<ClientCommunication />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Organizer Routes - Protected */}
          <Route path="/event-manager" element={
            <OrganizerRoute>
              <EventLayout />
            </OrganizerRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ticketing" element={<Ticketing />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="attendees-management" element={<AttendeesManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Organizer Routes - Alternative naming (for backward compatibility) */}
          <Route path="/organizer" element={
            <OrganizerRoute>
              <EventLayout />
            </OrganizerRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ticketing" element={<Ticketing />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="attendees-management" element={<AttendeesManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Attendee Routes - Protected */}
          <Route path="/attendee" element={
            <AttendeeRoute>
              <AttendeeLayout />
            </AttendeeRoute>
          }>
            <Route index element={<Navigate to="book-ticket" replace />} />
            <Route path="book-ticket" element={<TicketBookingPage />} />
            <Route path="my-bookings" element={<MyBookingsPage />} />
            <Route path="check-in" element={<CheckInPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<PlatformOverview />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="event-moderation" element={<EventModeration />} />
            <Route path="analytics" element={<AnalyticsReports />} />
            <Route path="configuration" element={<SystemConfiguration />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Error Pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/404" element={<NotFoundPage />} />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;