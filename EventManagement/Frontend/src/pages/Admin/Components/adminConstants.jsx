// src/constants/adminConstants.js
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BarChart2,
  Settings,
  ShieldCheck,
  Activity,
  DollarSign
} from 'lucide-react';

export const adminSidebarItems = [
  {
    id: 'overview',
    label: 'Platform Overview',
    icon: LayoutDashboard,
    color: 'from-red-600 to-rose-500',
    path: '/admin/overview'
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: Users,
    color: 'from-red-600 to-rose-500',
    path: '/admin/user-management'
  },
  {
    id: 'event-moderation',
    label: 'Event Moderation',
    icon: CalendarCheck,
    color: 'from-red-600 to-rose-500',
    path: '/admin/event-moderation'
  },
  {
    id: 'analytics',
    label: 'Analytics Reports',
    icon: BarChart2,
    color: 'from-red-600 to-rose-500',
    path: '/admin/analytics'
  },
  {
    id: 'configuration',
    label: 'System Configuration',
    icon: Settings,
    color: 'from-red-600 to-rose-500',
    path: '/admin/configuration'
  },
];

export const adminQuickStats = [
  { label: 'Total Users', value: '1,250', icon: Users },
  { label: 'Pending Verifications', value: '15', icon: ShieldCheck },
  { label: 'Platform Revenue', value: '$82.1k', icon: DollarSign },
  { label: 'Live Events', value: '312', icon: Activity },
];