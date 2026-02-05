import React, { useState, useEffect } from 'react';
import { User, Edit, Save, X, Calendar, MapPin, Phone, Mail, Building, Heart, AlertTriangle, Ticket, QrCode, Download, Share2, Clock, Check, Star, Gift } from 'lucide-react';
import { profileAPI } from '../../utils/api';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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
      const data = await profileAPI.getProfile();
      setProfileData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      await profileAPI.updateProfile(profileData);
      
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

                <div>
                  <label className="block text-sm font-medium mb-1">Dietary Restrictions</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.dietary_restrictions?.join(', ') || ''}
                      onChange={(e) => handleArrayInputChange('dietary_restrictions', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Vegetarian, Gluten-free, etc. (comma-separated)"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profileData.dietary_restrictions?.length > 0 
                        ? profileData.dietary_restrictions.join(', ')
                        : 'None'
                      }
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

                <div>
                  <label className="block text-sm font-medium mb-1">Accessibility Needs</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.accessibility_needs?.join(', ') || ''}
                      onChange={(e) => handleArrayInputChange('accessibility_needs', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Wheelchair access, Sign language, etc. (comma-separated)"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profileData.accessibility_needs?.length > 0 
                        ? profileData.accessibility_needs.join(', ')
                        : 'None'
                      }
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

          {/* Emergency Contact Section */}
          {(isEditing || profileData.emergency_contact?.name) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.emergency_contact?.name || ''}
                      onChange={(e) => handleInputChange('emergency_contact.name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Emergency contact name"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.emergency_contact?.name || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.emergency_contact?.phone || ''}
                      onChange={(e) => handleInputChange('emergency_contact.phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Emergency contact phone"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.emergency_contact?.phone || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Relationship</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.emergency_contact?.relationship || ''}
                      onChange={(e) => handleInputChange('emergency_contact.relationship', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Relationship (spouse, parent, etc.)"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.emergency_contact?.relationship || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Simple tabs for tickets and history (keeping existing mock functionality)
  const TicketsTab = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">My Tickets</h2>
      {userTickets.map(ticket => (
        <div key={ticket.id} className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold">{ticket.eventName}</h3>
          <p className="text-gray-600">{ticket.ticketType}</p>
          <p className="text-sm text-gray-500">{ticket.eventDate} at {ticket.eventTime}</p>
        </div>
      ))}
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Event History</h2>
      {eventHistory.map(event => (
        <div key={event.id} className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold">{event.eventName}</h3>
          <p className="text-gray-600">{event.date}</p>
          <p className="text-sm text-gray-500">{event.venue}</p>
          {event.rating && (
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < event.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h1 className="text-3xl font-bold">Profile Management</h1>
          <p className="text-gray-600 mt-2">Manage your profile information and view your event history</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'tickets', label: 'My Tickets', icon: Ticket },
              { id: 'history', label: 'Event History', icon: Calendar }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'tickets' && <TicketsTab />}
            {activeTab === 'history' && <HistoryTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;