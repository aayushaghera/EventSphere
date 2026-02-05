import React, { useState, useEffect } from 'react';
import { User, Edit, Save, X, Calendar, MapPin, Phone, Mail, Building, Heart, AlertTriangle, Ticket, QrCode, Download, Share2, Clock, Check, Star, Gift } from 'lucide-react';
import { authAPI } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { AttendeeOnly, useRoleAccess } from '../../components/RoleAccess';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, getUserId } = useAuth();
  const { isAttendee, canAccessResource } = useRoleAccess();
  
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    date_of_birth: '',
    preferred_communication: 'email',
    newsletter_subscribed: false
  });

  // Mock data for tickets and event history (would come from separate API endpoints)
  const [userTickets, setUserTickets] = useState([
    {
      id: 1,
      eventName: 'Tech Conference 2025',
      ticketType: 'VIP Pass',
      ticketNumber: 'TK-001-VIP',
      eventDate: '2025-10-15',
      eventTime: '09:00 AM',
      venue: 'Convention Center, San Francisco',
      status: 'confirmed',
      checkedIn: false,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TK-001-VIP',
      price: 599,
      purchaseDate: '2025-08-15',
      benefits: ['VIP lounge access', 'Meet & greet with speakers', 'Premium swag bag']
    },
    {
      id: 2,
      eventName: 'Design Summit 2025',
      ticketType: 'Early Bird',
      ticketNumber: 'TK-002-EB',
      eventDate: '2025-11-20',
      eventTime: '10:00 AM',
      venue: 'Art Museum, New York',
      status: 'confirmed',
      checkedIn: true,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TK-002-EB',
      price: 149,
      purchaseDate: '2025-07-20',
      benefits: ['20% discount', 'Priority seating']
    }
  ]);

  const [eventHistory, setEventHistory] = useState([
    {
      id: 1,
      eventName: 'DevCon 2024',
      date: '2024-09-15',
      venue: 'Tech Hub, San Francisco',
      ticketType: 'General Admission',
      rating: 5,
      feedback: 'Amazing event! Great speakers and networking opportunities.',
      attended: true
    },
    {
      id: 2,
      eventName: 'AI Summit 2024',
      date: '2024-06-10',
      venue: 'Innovation Center, Silicon Valley',
      ticketType: 'VIP Pass',
      rating: 4,
      feedback: 'Good content but could have been better organized.',
      attended: true
    }
  ]);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Use auth API to get profile data
      const data = await authAPI.getProfile();
      setProfileData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      await authAPI.updateProfile(profileData);
      
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const downloadTicket = (ticket) => {
    alert(`Downloading ticket for ${ticket.eventName}`);
  };

  const ProfileTab = () => {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                    fetchProfile(); // Reset data
                  }}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={32} className="text-blue-600" />
            </div>
            
            <div className="flex-1 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.full_name || ''}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.full_name || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    {profileData.email || 'Not provided'}
                  </p>
                  {isEditing && (
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed here. Contact support if needed.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.company || ''}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your company"
                    />
                  ) : (
                    <p className="text-gray-900 flex items-center gap-2">
                      <Building size={16} className="text-gray-500" />
                      {profileData.company || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website || ''}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://your-website.com"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profileData.website ? (
                        <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {profileData.website}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-gray-900 flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      {profileData.phone || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.job_title || ''}
                      onChange={(e) => handleInputChange('job_title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your job title"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.job_title || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your location"
                    />
                  ) : (
                    <p className="text-gray-900 flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      {profileData.location || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.linkedin || ''}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="LinkedIn profile URL"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profileData.linkedin ? (
                        <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {profileData.linkedin}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profileData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700">{profileData.bio || 'No bio provided'}</p>
            )}
          </div>

          {/* Communication Preferences */}
          {isEditing && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Communication Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Communication</label>
                  <select
                    value={profileData.preferred_communication || 'email'}
                    onChange={(e) => handleInputChange('preferred_communication', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="both">Both Email and SMS</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={profileData.newsletter_subscribed || false}
                    onChange={(e) => handleInputChange('newsletter_subscribed', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="newsletter" className="text-sm">
                    Subscribe to newsletters and event updates
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const TicketsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Tickets</h2>
        <p className="text-gray-600">{userTickets.length} active tickets</p>
      </div>

      {userTickets.map((ticket) => (
        <div key={ticket.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold">{ticket.eventName}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ticket.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {ticket.status}
                </span>
                {ticket.checkedIn && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    Checked In
                  </span>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(ticket.eventDate).toLocaleDateString()} at {ticket.eventTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{ticket.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket size={16} />
                  <span>{ticket.ticketType} - {ticket.ticketNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">${ticket.price}</span>
                </div>
              </div>

              {ticket.benefits && ticket.benefits.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {ticket.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 ml-6">
              <img 
                src={ticket.qrCode} 
                alt="QR Code" 
                className="w-20 h-20 border border-gray-200 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => downloadTicket(ticket)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Download size={14} />
                  Download
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                  <Share2 size={14} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Event History</h2>
        <p className="text-gray-600">{eventHistory.length} events attended</p>
      </div>

      {eventHistory.map((event) => (
        <div key={event.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold">{event.eventName}</h3>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Attended
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket size={16} />
                  <span>{event.ticketType}</span>
                </div>
              </div>

              {event.feedback && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 mb-2">"{event.feedback}"</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        size={14} 
                        className={index < event.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                      />
                    ))}
                    <span className="ml-2 text-xs text-gray-600">{event.rating}/5</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <AttendeeOnly>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'tickets', label: 'My Tickets', icon: Ticket },
                { id: 'history', label: 'Event History', icon: Clock }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'tickets' && <TicketsTab />}
        {activeTab === 'history' && <HistoryTab />}
      </div>
    </AttendeeOnly>
  );
};export default ProfilePage;