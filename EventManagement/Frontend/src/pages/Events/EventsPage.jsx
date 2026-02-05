import React from 'react';
import { Calendar, MapPin, Star, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
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
                  onClick={() => navigate(`/events/${event.id}`)}
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
};

export default EventsPage;