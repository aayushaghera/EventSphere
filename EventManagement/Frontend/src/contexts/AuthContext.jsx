import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Set token and store in localStorage
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  // Set user and store in localStorage
  const setUserData = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('authUser', JSON.stringify(userData));
    } else {
      localStorage.removeItem('authUser');
    }
  };

  // Login function
  const login = (token, userData) => {
    setToken(token);
    setUserData(userData);
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/auth/login');
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.user_type === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.user_type);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Get user role
  const getUserRole = () => {
    return user?.user_type || null;
  };

  // Get user ID
  const getUserId = () => {
    return user?.id || null;
  };

  // Check if user can access resource (own resource or admin)
  const canAccessResource = (resourceUserId) => {
    if (!user) return false;
    return user.user_type === 'admin' || user.id === resourceUserId;
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    hasRole,
    hasAnyRole,
    isAuthenticated,
    getUserRole,
    getUserId,
    canAccessResource,
    setUser: setUserData,
    setToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;