import React, { useState, useEffect } from 'react';
import { User, Building, Shield, Users, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI, auth } from '../../utils/api';
import { validateRegistrationForm } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getUserRole } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'attendee',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const userRole = getUserRole();
      switch(userRole) {
        case 'organizer':
          navigate('/event-manager/dashboard');
          break;
        case 'venue_owner':
          navigate('/venue/dashboard');
          break;
        case 'admin':
          navigate('/admin/overview');
          break;
        case 'attendee':
          navigate('/attendee/book-ticket');
          break;
        default:
          navigate('/dashboard');
      }
    }
  }, [isAuthenticated, getUserRole, navigate]);

  const userRoles = [
    {
      id: 'attendee',
      title: 'Attendee',
      description: 'Browse and book events',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      route: '/attendee/dashboard'
    },
    {
      id: 'organizer',
      title: 'Event Organizer',
      description: 'Create and manage events',
      icon: Users,
      color: 'from-green-500 to-green-600',
      route: '/organizer/dashboard'
    },
    {
      id: 'venue_owner',
      title: 'Venue Owner',
      description: 'Manage venue bookings',
      icon: Building,
      color: 'from-orange-500 to-orange-600',
      route: '/venue-owner/dashboard'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFieldErrors({});

    // Validate form
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for backend (map frontend field names to backend field names)
      const registrationData = {
        email: formData.email,
        password: formData.password,
        full_name: formData.name,
        user_type: formData.userType,
        phone: formData.phone || undefined
      };

      // Call the backend registration API
      const response = await authAPI.register(registrationData);

      console.log('Registration successful:', response);
      
      // Show success message and redirect to login
      alert(`Registration successful! Please log in with your credentials.`);
      navigate('/auth/login');

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/auth/login');
  };

  const selectedRole = userRoles.find(role => role.id === formData.userType);
  const IconComponent = selectedRole.icon;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${selectedRole.color} px-8 py-6 text-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <IconComponent className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-white">Join EventPro</h1>
              <p className="text-white text-opacity-90 mt-2">Create your {selectedRole.title} account</p>
            </div>
          </div>

          <div className="px-8 py-8">
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Register as</label>
              <div className="grid grid-cols-2 gap-3">
                {userRoles.map((role) => {
                  const RoleIcon = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: role.id })}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.userType === role.id
                          ? `border-transparent bg-gradient-to-r ${role.color} text-white shadow-lg transform scale-105`
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <RoleIcon
                          className={`w-5 h-5 ${
                            formData.userType === role.id ? 'text-white' : 'text-gray-600'
                          }`}
                        />
                        <span className="text-xs font-medium">{role.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">{selectedRole.description}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white ${
                    fieldErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your name"
                  required
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white ${
                    fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white ${
                    fieldErrors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number (10 digits)"
                  pattern="[0-9]{10}"
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white ${
                      fieldErrors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white ${
                      fieldErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${selectedRole.color} hover:shadow-lg hover:scale-105 active:scale-95`
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <IconComponent className="w-5 h-5" />
                    <span>Sign up as {selectedRole.title}</span>
                  </div>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <button
                onClick={navigateToLogin}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
