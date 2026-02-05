// src/pages/Admin/EventModeration.jsx
import React, { useState } from 'react';
import { Check, X, MapPin, Calendar, User } from 'lucide-react';

const EventModeration = () => {
  const [activeTab, setActiveTab] = useState('events');

  // JSON array for pending events - easy to connect with API
  const pendingEvents = [
    { 
      id: 1, 
      name: 'Annual Tech Conference 2025', 
      organizer: 'John Doe',
      organizerEmail: 'john.d@example.com',
      date: '2025-10-15',
      location: 'Tech Center Hall',
      category: 'Technology',
      expectedAttendees: 500,
      requestedAt: '2025-01-15T10:30:00Z',
      description: 'A comprehensive technology conference featuring the latest innovations and industry leaders.'
    },
    { 
      id: 2, 
      name: 'Local Charity Fun Run', 
      organizer: 'Jane Smith',
      organizerEmail: 'jane.s@example.com',
      date: '2025-09-30',
      location: 'Central Park',
      category: 'Sports',
      expectedAttendees: 200,
      requestedAt: '2025-01-12T14:20:00Z',
      description: 'Community charity run to raise funds for local homeless shelter.'
    },
    { 
      id: 3, 
      name: 'Downtown Music Festival', 
      organizer: 'Mike Johnson',
      organizerEmail: 'mike.j@example.com',
      date: '2025-11-05',
      location: 'Downtown Arena',
      category: 'Music',
      expectedAttendees: 1000,
      requestedAt: '2025-01-10T09:15:00Z',
      description: 'Multi-day music festival featuring local and international artists.'
    },
  ];

  // JSON array for pending venues - easy to connect with API
  const pendingVenues = [
    {
      id: 1,
      name: 'Grand Convention Center',
      owner: 'Sara Wilson',
      ownerEmail: 'sara.w@example.com',
      address: '123 Main Street, Downtown',
      capacity: 1500,
      type: 'Convention Center',
      amenities: ['Parking', 'Catering', 'AV Equipment', 'WiFi'],
      requestedAt: '2025-01-14T11:45:00Z',
      description: 'Modern convention center with state-of-the-art facilities and flexible event spaces.'
    },
    {
      id: 2,
      name: 'Riverside Community Hall',
      owner: 'Tom Brown',
      ownerEmail: 'tom.b@example.com',
      address: '456 River Road, Riverside',
      capacity: 300,
      type: 'Community Hall',
      amenities: ['Parking', 'Kitchen', 'Tables & Chairs'],
      requestedAt: '2025-01-13T16:30:00Z',
      description: 'Cozy community hall perfect for local gatherings and small events.'
    },
    {
      id: 3,
      name: 'Skyline Rooftop Venue',
      owner: 'Lisa Davis',
      ownerEmail: 'lisa.d@example.com',
      address: '789 High Street, Uptown',
      capacity: 150,
      type: 'Rooftop Venue',
      amenities: ['City View', 'Bar', 'Outdoor Space', 'Photography Area'],
      requestedAt: '2025-01-11T13:20:00Z',
      description: 'Elegant rooftop venue with stunning city views, perfect for corporate events and celebrations.'
    },
  ];

  // Handle event approval/rejection
  const handleEventAction = (eventId, action) => {
    // Here you would make API call to approve/reject event
    console.log(`${action} event with ID: ${eventId}`);
    
    // Show success message (you can implement toast notification)
    alert(`Event ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
  };

  // Handle venue approval/rejection
  const handleVenueAction = (venueId, action) => {
    // Here you would make API call to approve/reject venue
    console.log(`${action} venue with ID: ${venueId}`);
    
    // Show success message (you can implement toast notification)
    alert(`Venue ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Content Moderation</h1>
      
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                Event Requests ({pendingEvents.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('venues')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'venues'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                Venue Requests ({pendingVenues.length})
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Event Moderation Tab */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Pending Event Approvals ({pendingEvents.length})
          </h2>
          <div className="space-y-4">
            {pendingEvents.map(event => (
              <div key={event.id} className="border rounded-xl p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{event.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {event.category}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User size={16} />
                          <span><strong>Organizer:</strong> {event.organizer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span><strong>Date:</strong> {formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} />
                          <span><strong>Location:</strong> {event.location}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <strong>Expected Attendees:</strong> {event.expectedAttendees}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Requested:</strong> {formatTimestamp(event.requestedAt)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Email:</strong> {event.organizerEmail}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Description:</strong> {event.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleEventAction(event.id, 'approve')}
                      className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                      title="Approve Event"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => handleEventAction(event.id, 'reject')}
                      className="p-3 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                      title="Reject Event"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {pendingEvents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No pending event requests</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Venue Moderation Tab */}
      {activeTab === 'venues' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Pending Venue Approvals ({pendingVenues.length})
          </h2>
          <div className="space-y-4">
            {pendingVenues.map(venue => (
              <div key={venue.id} className="border rounded-xl p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{venue.name}</h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {venue.type}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User size={16} />
                          <span><strong>Owner:</strong> {venue.owner}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} />
                          <span><strong>Address:</strong> {venue.address}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Capacity:</strong> {venue.capacity} people
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <strong>Requested:</strong> {formatTimestamp(venue.requestedAt)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Email:</strong> {venue.ownerEmail}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Description:</strong> {venue.description}
                      </p>
                      <div className="text-sm text-gray-600">
                        <strong>Amenities:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {venue.amenities.map((amenity, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleVenueAction(venue.id, 'approve')}
                      className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                      title="Approve Venue"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => handleVenueAction(venue.id, 'reject')}
                      className="p-3 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                      title="Reject Venue"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {pendingVenues.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <MapPin size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No pending venue requests</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModeration;