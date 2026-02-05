// src/constants.js

import { 
  Building2, Calendar, BarChart3, Settings, MessageSquare, 
  Home, TrendingUp, Award 
} from 'lucide-react';

export const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-yellow-500 to-orange-500', path: '/venue/dashboard' },
  { id: 'management', label: 'Venue Management', icon: Building2, color: 'from-yellow-500 to-orange-500', path: '/venue/management' },
  { id: 'calendar', label: 'Booking Calendar', icon: Calendar, color: 'from-yellow-500 to-orange-500', path: '/venue/calendar' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'from-yellow-500 to-orange-500', path: '/venue/analytics' },
  { id: 'communications', label: 'Client Communication', icon: MessageSquare, color: 'from-yellow-500 to-orange-500', path: '/venue/communications' },
];

export const quickStats = [
  { label: 'Active Venues', value: '12', icon: Building2 },
  { label: 'Today\'s Bookings', value: '8', icon: Calendar },
  { label: 'Revenue', value: '$24.5k', icon: TrendingUp },
  { label: 'Client Satisfaction', value: '4.9', icon: Award },
];