import React, { useState } from 'react';
import { Calendar, MapPin, Users, Star, TrendingUp, Search, Filter, ArrowRight, ChevronDown, Menu, X, User, LogOut, Settings, BarChart3, Plus, Home, Ticket, Building2 } from 'lucide-react';

const EventManagementPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userType, setUserType] = useState('attendee');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const sampleEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      category: "conference",
      date: "2024-12-15",
      time: "09:00 AM",
      venue: "Grand Convention Center",
      location: "Ahmedabad, Gujarat",
      price: 2500,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      attendees: 245,
      capacity: 300,
      rating: 4.8,
      organizer: "TechEvents Inc."
    },
    {
      id: 2,
      title: "Cultural Festival",
      category: "cultural",
      date: "2024-12-20",
      time: "04:00 PM",
      venue: "City Auditorium",
      location: "Ahmedabad, Gujarat",
      price: 800,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      attendees: 680,
      capacity: 800,
      rating: 4.9,
      organizer: "Cultural Society"
    },
    {
      id: 3,
      title: "Digital Marketing Workshop",
      category: "workshop",
      date: "2024-12-10",
      time: "10:00 AM",
      venue: "Business Hub",
      location: "Ahmedabad, Gujarat",
      price: 1500,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      attendees: 95,
      capacity: 150,
      rating: 4.7,
      organizer: "Digital Masters"
    }
  ];

  const sampleVenues = [
    {
      id: 1,
      name: "Grand Convention Center",
      type: "Conference Hall",
      capacity: 500,
      location: "Satellite Road, Ahmedabad",
      hourlyRate: 5000,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      facilities: ["Parking", "WiFi", "A/C", "Sound System"],
      rating: 4.8
    },
    {
      id: 2,
      name: "City Auditorium",
      type: "Auditorium",
      capacity: 1000,
      location: "CG Road, Ahmedabad",
      hourlyRate: 8000,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      facilities: ["Parking", "WiFi", "A/C", "Sound System", "Stage Lighting"],
      rating: 4.9
    }
  ];

  const Navigation = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">EventPro</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('events')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'events' ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Events
            </button>
            <button 
              onClick={() => setCurrentPage('venues')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'venues' ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Venues
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentPage('register')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => {setCurrentPage('home'); setIsMobileMenuOpen(false);}}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Home
            </button>
            <button 
              onClick={() => {setCurrentPage('events'); setIsMobileMenuOpen(false);}}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Events
            </button>
            <button 
              onClick={() => {setCurrentPage('venues'); setIsMobileMenuOpen(false);}}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Venues
            </button>
            {!isLoggedIn && (
              <>
                <button 
                  onClick={() => {setCurrentPage('login'); setIsMobileMenuOpen(false);}}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                >
                  Login
                </button>
                <button 
                  onClick={() => {setCurrentPage('register'); setIsMobileMenuOpen(false);}}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Create
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Amazing </span>
              Events
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The ultimate platform for event organizers, venue owners, and attendees. 
              Discover, create, and manage unforgettable experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('events')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Events
              </button>
              <button 
                onClick={() => setCurrentPage('register')}
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Event Management</h3>
            <p className="text-gray-600">Create and manage events with ease. From conferences to concerts, we've got you covered.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Venue Booking</h3>
            <p className="text-gray-600">Find and book the perfect venue for your event from our extensive network of partners.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Ticket className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Ticketing</h3>
            <p className="text-gray-600">Advanced ticketing system with QR codes, different ticket types, and real-time analytics.</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-xl text-gray-600">Don't miss out on these amazing upcoming events</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sampleEvents.slice(0, 3).map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600 capitalize">
                  {event.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.venue}, {event.location}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600">₹{event.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{event.rating}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedEvent(event);
                    setCurrentPage('event-details');
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EventsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 lg:mb-0">Discover Events</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
            <button className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600 capitalize">
                  {event.category}
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm">
                  {event.attendees}/{event.capacity}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-3">by {event.organizer}</p>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.venue}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600">₹{event.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{event.rating}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedEvent(event);
                    setCurrentPage('event-details');
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EventDetailsPage = () => {
    if (!selectedEvent) return <div>Event not found</div>;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-96 overflow-hidden">
          <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold capitalize mb-4 inline-block">
              {selectedEvent.category}
            </span>
            <h1 className="text-4xl font-bold mb-2">{selectedEvent.title}</h1>
            <p className="text-xl">by {selectedEvent.organizer}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                <p className="text-gray-600 leading-relaxed">
                  {selectedEvent.category === 'conference' 
                    ? "Join us for an incredible technology conference featuring the latest innovations, industry insights, and networking opportunities. This event brings together thought leaders, entrepreneurs, and technology enthusiasts from around the world."
                    : selectedEvent.category === 'cultural'
                    ? "Experience a vibrant celebration of local arts, culture, and traditions. This festival showcases the rich heritage of our community through music, dance, art exhibitions, and cultural performances."
                    : "Enhance your digital marketing skills with hands-on workshops, expert guidance, and practical strategies. Learn from industry professionals and take your marketing game to the next level."
                  }
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-900">09:00 AM - Registration & Welcome</p>
                      <p className="text-gray-600">Check-in and networking breakfast</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-900">10:00 AM - Keynote Session</p>
                      <p className="text-gray-600">Opening remarks and main presentation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-900">12:00 PM - Lunch Break</p>
                      <p className="text-gray-600">Networking lunch and refreshments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-purple-600">₹{selectedEvent.price}</span>
                  <p className="text-gray-600">per ticket</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-semibold">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Venue</span>
                    <span className="font-semibold">{selectedEvent.venue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available</span>
                    <span className="font-semibold">{selectedEvent.capacity - selectedEvent.attendees} tickets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold ml-1">{selectedEvent.rating}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setCurrentPage('booking')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 mb-4"
                >
                  Book Now
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Secure booking with instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

const VenuesPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 lg:mb-0">Find Venues</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search venues..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
            <button className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sampleVenues.map(venue => (
            <div key={venue.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <img src={venue.image} alt={venue.name} className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                  {venue.type}
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm">
                  <Users className="w-4 h-4 inline mr-1" />
                  {venue.capacity}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{venue.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{venue.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {venue.facilities.map((facility, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                      {facility}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">₹{venue.hourlyRate}</span>
                    <span className="text-gray-600">/hour</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{venue.rating}</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white">Complete Your Booking</h1>
            <p className="text-purple-100 mt-2">{selectedEvent?.title}</p>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ticket Information</h2>
                
                <div className="space-y-6">
                  <div className="border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">General Admission</span>
                      <span className="text-purple-600 font-bold">₹{selectedEvent?.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Full access to all sessions and networking areas</p>
                    <div className="flex items-center space-x-3">
                      <button className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50">-</button>
                      <span className="w-12 text-center font-semibold">1</span>
                      <button className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50">+</button>
                    </div>
                  </div>

                  <div className="border rounded-xl p-4 opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">VIP Pass</span>
                      <span className="text-purple-600 font-bold">₹{selectedEvent?.price * 2}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Premium seating, exclusive networking, meals included</p>
                    <span className="text-red-500 text-sm font-semibold">Sold Out</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Information</h3>
                  <div className="grid gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>General Admission × 1</span>
                      <span>₹{selectedEvent?.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service Fee</span>
                      <span>₹50</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST (18%)</span>
                      <span>₹{Math.round((selectedEvent?.price + 50) * 0.18)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{Math.round((selectedEvent?.price + 50) * 1.18)}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Discount Code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                    />
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors">
                      Apply Code
                    </button>
                  </div>

                  <button 
                    onClick={() => setCurrentPage('booking-confirmation')}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    Proceed to Payment
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Secure payment powered by industry-standard encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingConfirmationPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-8">Your tickets have been booked successfully. Check your email for confirmation details.</p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-semibold">BKG2024001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Event:</span>
                <span className="font-semibold">{selectedEvent?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{selectedEvent?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tickets:</span>
                <span className="font-semibold">1 × General Admission</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Paid:</span>
                <span className="font-semibold">₹{Math.round((selectedEvent?.price + 50) * 1.18)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
            >
              Back to Home
            </button>
            <button className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors">
              Download Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </button>
            </div>

            <button 
              type="button"
              onClick={() => {
                setIsLoggedIn(true);
                setCurrentPage('dashboard');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <button 
              onClick={() => setCurrentPage('register')}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join EventPro today</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <select 
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="attendee">Attendee</option>
                <option value="organizer">Event Organizer</option>
                <option value="venue_owner">Venue Owner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Create a strong password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>

            <button 
              type="button"
              onClick={() => {
                setIsLoggedIn(true);
                setCurrentPage('dashboard');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <button 
              onClick={() => setCurrentPage('login')}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
const DashboardPage = () => {
    const getDashboardContent = () => {
      switch(userType) {
        case 'organizer':
          return (
            <div className="space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Events</p>
                      <p className="text-3xl font-bold text-gray-900">12</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">₹2.4L</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Tickets Sold</p>
                      <p className="text-3xl font-bold text-gray-900">1,247</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Ticket className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Avg Rating</p>
                      <p className="text-3xl font-bold text-gray-900">4.8</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Events</h3>
                  <div className="space-y-4">
                    {sampleEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <img src={event.image} alt={event.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                        <span className="text-green-600 font-semibold">₹{event.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Plus className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-purple-600">Create New Event</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-600" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-600">View Analytics</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-600">Manage Attendees</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          
        case 'venue_owner':
          return (
            <div className="space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Venues</p>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">45</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">₹3.8L</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Avg Rating</p>
                      <p className="text-3xl font-bold text-gray-900">4.9</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h3>
                  <div className="space-y-4">
                    {sampleVenues.slice(0, 2).map(venue => (
                      <div key={venue.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <img src={venue.image} alt={venue.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{venue.name}</p>
                          <p className="text-sm text-gray-600">{venue.type}</p>
                        </div>
                        <span className="text-green-600 font-semibold">₹{venue.hourlyRate}/hr</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Plus className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-600">Add New Venue</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-600">Manage Bookings</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-purple-600">View Analytics</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          
        default:
          return (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Events Attended</p>
                      <p className="text-3xl font-bold text-gray-900">8</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Upcoming Events</p>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Ticket className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Spent</p>
                      <p className="text-3xl font-bold text-gray-900">₹12.5K</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h3>
                  <div className="space-y-4">
                    {sampleEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <img src={event.image} alt={event.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                        <span className="text-green-600 font-semibold">Booked</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Events</h3>
                  <div className="space-y-4">
                    {sampleEvents.slice(0, 2).map(event => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                           onClick={() => {
                             setSelectedEvent(event);
                             setCurrentPage('event-details');
                           }}>
                        <img src={event.image} alt={event.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                        <span className="text-purple-600 font-semibold">₹{event.price}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage('events')}
                    className="w-full mt-4 bg-purple-50 hover:bg-purple-100 text-purple-600 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Explore More Events
                  </button>
                </div>
              </div>
            </div>
          );
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Here's what's happening with your {userType === 'organizer' ? 'events' : userType === 'venue_owner' ? 'venues' : 'bookings'}.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <select 
                value={userType} 
                onChange={(e) => setUserType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="attendee">Attendee View</option>
                <option value="organizer">Organizer View</option>
                <option value="venue_owner">Venue Owner View</option>
              </select>
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentPage('home');
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {getDashboardContent()}
        </div>
      </div>
    );
  };

  // Main component render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'events' && <EventsPage />}
      {currentPage === 'event-details' && <EventDetailsPage />}
      {currentPage === 'venues' && <VenuesPage />}
      {currentPage === 'booking' && <BookingPage />}
      {currentPage === 'booking-confirmation' && <BookingConfirmationPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
    </div>
  );
};

export default EventManagementPlatform;