import React, { useState } from 'react';
import { Calendar, Menu, X, User, Shield, Users, Building, BarChart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, getUserRole, logout, user } = useAuth();

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleLogout = () => {
    logout();
  };

  const getDashboardRoute = () => {
    const userRole = getUserRole();
    switch(userRole) {
      case 'organizer':
        return '/event-manager/dashboard';
      case 'venue_owner':
        return '/venue/dashboard';
      case 'admin':
        return '/admin/overview';
      case 'attendee':
        return '/attendee/book-ticket';
      default:
        return '/dashboard';
    }
  };

  const getRoleBasedMenuItems = () => {
    const userRole = getUserRole();
    const baseItems = [
      { name: 'Home', path: '/', icon: null },
      { name: 'Events', path: '/events', icon: null },
    ];

    if (!isAuthenticated()) {
      return baseItems;
    }

    switch(userRole) {
      case 'admin':
        return [
          ...baseItems,
          { name: 'Admin Panel', path: '/admin/overview', icon: Shield },
          { name: 'User Management', path: '/admin/user-management', icon: Users },
          { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
        ];
      
      case 'organizer':
        return [
          ...baseItems,
          { name: 'Dashboard', path: '/event-manager/dashboard', icon: BarChart },
          { name: 'My Events', path: '/event-manager/dashboard', icon: Calendar },
          { name: 'Analytics', path: '/event-manager/analytics', icon: BarChart },
        ];
      
      case 'venue_owner':
        return [
          ...baseItems,
          { name: 'Dashboard', path: '/venue/dashboard', icon: Building },
          { name: 'My Venues', path: '/venue/management', icon: Building },
          { name: 'Calendar', path: '/venue/calendar', icon: Calendar },
        ];
      
      case 'attendee':
        return [
          ...baseItems,
          { name: 'Book Tickets', path: '/attendee/book-ticket', icon: Calendar },
          { name: 'My Bookings', path: '/attendee/my-bookings', icon: Users },
          { name: 'Profile', path: '/attendee/profile', icon: User },
        ];
      
      default:
        return baseItems;
    }
  };

  const getRoleDisplayName = () => {
    const userRole = getUserRole();
    switch(userRole) {
      case 'admin':
        return 'Admin';
      case 'organizer':
        return 'Event Organizer';
      case 'venue_owner':
        return 'Venue Owner';
      case 'attendee':
        return 'Attendee';
      default:
        return 'User';
    }
  };

  const menuItems = getRoleBasedMenuItems();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">EventPro</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path || 
                              (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                  {item.name}
                </button>
              );
            })}

            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-500" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{user?.full_name || 'User'}</div>
                    <div className="text-xs text-gray-500">{getRoleDisplayName()}</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate(getDashboardRoute())}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogin}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/auth/register')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path || 
                                (item.path !== '/' && location.pathname.startsWith(item.path));
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
                    {item.name}
                  </button>
                );
              })}

              {isAuthenticated() ? (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as <span className="font-medium text-gray-900">{user?.full_name || 'User'}</span>
                    <div className="text-xs">{getRoleDisplayName()}</div>
                  </div>
                  <button
                    onClick={() => {
                      navigate(getDashboardRoute());
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-purple-600 hover:bg-purple-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/auth/register');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-purple-600 hover:bg-purple-50"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;