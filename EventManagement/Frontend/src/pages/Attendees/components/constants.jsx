// src/constants.js

import { 
  Building2, 
  Calendar, 
  User, // ✨ CHANGE: Imported User icon
  MessageSquare, 
  Home, 
  TrendingUp, 
  Award 
} from 'lucide-react';

export const sidebarItems = [
  { id: 'dashboard', label: 'Book Tickets', icon: Home, path: '/attendee/book-ticket' },
  { id: 'management', label: 'My Bookings', icon: Building2, path: '/attendee/my-bookings' },
  { id: 'calendar', label: 'Check In', icon: Calendar, path: '/attendee/check-in' },
  { id: 'analytics', label: 'Profile', icon: User, path: '/attendee/profile' }, // ✨ CHANGE: Swapped icon for 'Profile'
  { id: 'communications', label: 'Feedback', icon: MessageSquare, path: '/attendee/feedback' },
];

export const quickStats = [
  { label: 'Active Venues', value: '12', icon: Building2 },
  { label: 'Today\'s Bookings', value: '8', icon: Calendar },
  { label: 'Revenue', value: '$24.5k', icon: TrendingUp },
  { label: 'Client Satisfaction', value: '4.9', icon: Award },
];