// src/components/layout/Header.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, ChevronRight, Building2, LogOut, UserPlus, Edit, Settings } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { quickStats } from './constants'; // Adjust path as needed

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.full_name || 'User');
  const [currentUsername, setCurrentUsername] = useState(user?.full_name || 'User');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update username state when user data changes
  useEffect(() => {
    if (user?.full_name) {
      setCurrentUsername(user.full_name);
      setNewUsername(user.full_name);
    }
  }, [user]);

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleCreateNewAccount = () => {
    setShowUserMenu(false);
    navigate('/auth/register');
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    // Add any logout logic here (clear tokens, etc.)
    navigate('/auth/login');
  };

  const handleRenameUser = () => {
    setShowUserMenu(false);
    setNewUsername(currentUsername);
    setShowRenameModal(true);
  };

  const handleSaveUsername = () => {
    setCurrentUsername(newUsername);
    setShowRenameModal(false);
  };

  const handleCancelRename = () => {
    setNewUsername(currentUsername);
    setShowRenameModal(false);
  };

  return (
    <>
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
              </button>
              
              {/* User Menu */}
              <div className="relative" ref={menuRef}>
                <div 
                  className="flex items-center space-x-3 p-1 rounded-xl hover:bg-gray-100 cursor-pointer"
                  onClick={handleUserMenuClick}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{currentUsername}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 hidden md:block transition-transform ${showUserMenu ? 'rotate-90' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{currentUsername}</p>
                      <p className="text-xs text-gray-500">Venue Manager</p>
                    </div>
                    
                    <button
                      onClick={handleRenameUser}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-3" />
                      Rename Username
                    </button>
                    
                    <button
                      onClick={handleCreateNewAccount}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserPlus className="w-4 h-4 mr-3" />
                      Create New Account
                    </button>
                    
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Rename Username Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rename Username</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter new username"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelRename}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUsername}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                disabled={!newUsername.trim()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;