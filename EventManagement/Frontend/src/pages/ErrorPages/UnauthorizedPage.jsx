import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { getUserRole, isAuthenticated } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    if (isAuthenticated()) {
      const role = getUserRole();
      switch (role) {
        case 'admin':
          navigate('/admin/overview');
          break;
        case 'organizer':
          navigate('/event-manager/dashboard');
          break;
        case 'venue_owner':
          navigate('/venue/dashboard');
          break;
        case 'attendee':
          navigate('/attendee/book-ticket');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldX className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            This area is restricted to specific user roles. Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need access?</strong> Contact your system administrator or check if you're logged in with the correct account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;