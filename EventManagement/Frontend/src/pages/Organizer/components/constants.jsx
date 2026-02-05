import { 
  Building2, 
  Calendar, 
  Home, 
  TrendingUp, 
  Award,
  Ticket,
  Megaphone,
  Users,
  BarChart3
} from 'lucide-react';

export const sidebarItems = [
  { id: 'dashboard', label: 'DashBoard', icon: Home, path: '/event-manager/dashboard' },
  { id: 'management', label: 'Ticketings', icon: Ticket, path: '/event-manager/Ticketings' },
  { id: 'calendar', label: 'Marketing', icon: Megaphone, path: '/event-manager/Marketing' },
  { id: 'analytics', label: 'Attendees Management', icon: Users, path: '/event-manager/Attendees-Management' }, 
  { id: 'communications', label: 'Analytics', icon: BarChart3, path: '/event-manager/Analytics' },
];

export const quickStats = [
  { label: 'Active Venues', value: '12', icon: Building2 },
  { label: 'Today\'s Bookings', value: '8', icon: Calendar },
  { label: 'Revenue', value: '$24.5k', icon: TrendingUp },
  { label: 'Client Satisfaction', value: '4.9', icon: Award },
];

