// src/pages/Admin/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Shield } from 'lucide-react';
import { adminSidebarItems } from './adminConstants';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden backdrop-blur-sm transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          /* Mobile: Fixed positioning */
          fixed lg:static
          inset-y-0 left-0 
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          transition-transform duration-300 ease-in-out 
          /* Z-index management */
          z-50 lg:z-auto
          /* Layout */
          w-72 bg-white/80 backdrop-blur-xl 
          border-r border-gray-200/50 
          flex flex-col
          /* Desktop: Part of flex layout */
          lg:flex-shrink-0
        `}
      >
        <div className="flex items-center space-x-3 p-4 h-16 border-b border-gray-200/50">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
           <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:text-gray-800 rounded-lg ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {adminSidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`block group relative rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-4 p-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-800'
                      }`}
                    />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;