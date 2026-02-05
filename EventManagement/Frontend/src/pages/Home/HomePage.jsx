import React from 'react';
import { Calendar, Building2, Ticket, Star, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

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

  return (
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
                onClick={() => navigate('/events')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Events
              </button>
              <button 
                onClick={() => navigate('/auth/register')}
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
                  onClick={() => navigate(`/events/${event.id}`)}
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
};

export default HomePage;