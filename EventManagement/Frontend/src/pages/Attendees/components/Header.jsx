// src/components/layout/Header.jsx

import React from 'react';
import { Search, Bell, User, Menu, ChevronRight, Building2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { quickStats } from './constants'; // Adjust path as needed

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

          {/* Quick Stats - Desktop Only */}


          {/* Search and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:block relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search venues..."
                className="w-full max-w-xs pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 from-green-500 to-green-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
            </button>
            <div className="flex items-center space-x-3 p-1 rounded-xl hover:bg-gray-100 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.full_name || 'User'}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;