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
    twitter: '',
    dietary_restrictions: [],
    accessibility_needs: [],
    emergency_contact: {
      name: '',
      phone: '',
      relationship: ''
    },
    date_of_birth: '',
    preferred_communication: 'email',
    newsletter_subscribed: false,
    marketing_consent: false
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

  // Parse full name into first and last name for display
  const getFirstName = () => {
    if (!profileData.full_name) return '';
    return profileData.full_name.split(' ')[0] || '';
  };

  const getLastName = () => {
    if (!profileData.full_name) return '';
    const parts = profileData.full_name.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
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

  const ProfileTab = () => (
    <div className="space-y-6">
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
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
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
                <label className="block text-sm font-medium mb-1">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    {profileData.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center gap-2">
                    <Building size={16} className="text-gray-500" />
                    {profileData.company}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profileData.website}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    {profileData.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.jobTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    {profileData.location}
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
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-700">{profileData.bio}</p>
          )}
        </div>
      </div>

      {/* Special Requirements */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Heart size={20} className="text-red-500" />
          Special Requirements
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.dietaryRestrictions.join(', ')}
                onChange={(e) => handleArrayInputChange('dietaryRestrictions', e.target.value)}
                placeholder="e.g., Vegetarian, Gluten-free"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="space-y-1">
                {profileData.dietaryRestrictions.length > 0 ? (
                  profileData.dietaryRestrictions.map((restriction, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2">
                      {restriction}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">None specified</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Accessibility Needs</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.accessibilityNeeds.join(', ')}
                onChange={(e) => handleArrayInputChange('accessibilityNeeds', e.target.value)}
                placeholder="e.g., Wheelchair Access, Sign Language"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="space-y-1">
                {profileData.accessibilityNeeds.length > 0 ? (
                  profileData.accessibilityNeeds.map((need, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 flex items-center gap-1">
                      <AlertTriangle size={12} />
                      {need}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">None specified</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-orange-500" />
          Emergency Contact
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.emergencyContact.name}
                onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profileData.emergencyContact.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.emergencyContact.phone}
                onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profileData.emergencyContact.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Relationship</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.emergencyContact.relationship}
                onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profileData.emergencyContact.relationship}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const TicketsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Tickets</h2>
        <div className="text-sm text-gray-600">
          {userTickets.length} ticket{userTickets.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-6">
        {userTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{ticket.eventName}</h3>
                  <div className="flex items-center gap-4 text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(ticket.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{ticket.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{ticket.venue}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ticket.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                    {ticket.checkedIn && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1">
                        <Check size={12} />
                        Checked In
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">${ticket.price}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Ticket className="text-blue-600" size={20} />
                      <span className="font-medium">{ticket.ticketType}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      #{ticket.ticketNumber}
                    </div>
                  </div>

                  {ticket.benefits && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">What's included:</h4>
                      <ul className="space-y-1">
                        {ticket.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check size={14} className="text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => downloadTicket(ticket)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Download size={16} />
                      Download Ticket
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-2">
                      <QrCode size={80} className="text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">QR Code for Check-in</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Purchased on: {new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                  <span>Order #: ORD-{ticket.id.toString().padStart(6, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Event History</h2>
        <div className="text-sm text-gray-600">
          {eventHistory.length} past event{eventHistory.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {eventHistory.map((event) => (
          <div key={event.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.eventName}</h3>
                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{event.venue}</span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {event.ticketType}
                  </span>
                </div>
                
                {event.feedback && (
                  <div className="mb-3">
                    <p className="text-gray-700 text-sm italic">"{event.feedback}"</p>
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < event.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  event.attended 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {event.attended ? 'Attended' : 'Did not attend'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {eventHistory.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No past events</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your attended events will appear here after you check in.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600">{profileData.jobTitle} at {profileData.company}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tickets'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Tickets ({userTickets.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Event History ({eventHistory.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'tickets' && <TicketsTab />}
        {activeTab === 'history' && <HistoryTab />}
      </div>
    </div>
  );
};

export default ProfilePage;