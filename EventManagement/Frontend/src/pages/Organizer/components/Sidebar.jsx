import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X, Building2 } from 'lucide-react';
import { sidebarItems } from './constants';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col`}>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center space-x-3 p-4 h-16 border-b border-gray-200/50">
          <div className={`w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg transition-colors`}>
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">Event Pro</h1>
          </div>
        </div>

        {/* Mobile Header (hidden on desktop) */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Event Pro</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 pb-4 space-y-2">
          {sidebarItems.map((item) => {
            // Use location to decide active state so we match nested routes too
            const isActive = location.pathname === item.path ||
              location.pathname.startsWith(item.path + '/') ||
              location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose} // Close sidebar on mobile after navigation
                className={`block group relative rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center space-x-4 p-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-800'}`} />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;