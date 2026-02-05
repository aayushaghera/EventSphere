import React, { useState } from 'react';
import { Calendar, Users, DollarSign, BarChart3, Tag, Plus, X, Save, AlertCircle, Edit, Trash2 } from 'lucide-react';
import Dashboard from './Dashboard';
import Ticketing from './Ticketing';
import Marketing from './Marketing';
import AttendeeManagement from './AttendeeManagement';
import Analytics from './Analytics';

const EventManagementApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2025",
      category: "Conference",
      description: "Annual technology conference featuring industry leaders",
      startDate: "2025-10-15",
      startTime: "09:00",
      endDate: "2025-10-16",
      endTime: "18:00",
      venue: "Convention Center",
      status: "Active",
      ticketsSold: 250,
      totalTickets: 500,
      revenue: 12500
    }
  ]);

  const [tickets, setTickets] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [errors, setErrors] = useState({});

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    category: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    venue: '',
    totalTickets: '',
    price: ''
  });

  const eventCategories = ['Conference', 'Workshop', 'Seminar', 'Concert', 'Exhibition', 'Networking'];

  // Validation function
  const validateEventForm = () => {
    const newErrors = {};

    if (!eventForm.title || eventForm.title.length < 3) {
      newErrors.title = 'Event title must be at least 3 characters';
    }

    if (!eventForm.category) {
      newErrors.category = 'Please select a category';
    }

    if (!eventForm.description) {
      newErrors.description = 'Description is required';
    }

    if (!eventForm.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!eventForm.endDate || new Date(eventForm.endDate) < new Date(eventForm.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!eventForm.venue) {
      newErrors.venue = 'Venue is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event CRUD operations
  const handleCreateEvent = () => {
    if (!validateEventForm()) return;

    const newEvent = {
      id: events.length + 1,
      ...eventForm,
      status: 'Active',
      ticketsSold: 0,
      revenue: 0
    };

    setEvents([...events, newEvent]);
    resetEventForm();
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event.id);
    setEventForm(event);
    setShowEventForm(true);
  };

  const handleUpdateEvent = () => {
    if (!validateEventForm()) return;

    setEvents(events.map(event =>
      event.id === editingEvent
        ? { ...event, ...eventForm }
        : event
    ));
    resetEventForm();
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const resetEventForm = () => {
    setEventForm({
      title: '',
      category: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      venue: '',
      totalTickets: '',
      price: ''
    });
    setShowEventForm(false);
    setEditingEvent(null);
    setErrors({});
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'ticketing', label: 'Ticketing', icon: Tag },
    { id: 'marketing', label: 'Marketing', icon: DollarSign },
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  // Event Form Modal
  const EventFormModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h3>
          <button onClick={resetEventForm} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
            <input
              type="text"
              value={eventForm.title}
              onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={eventForm.category}
              onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="">Select category</option>
              {eventCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
              rows="3"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Event description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                value={eventForm.startDate}
                onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.startDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={eventForm.startTime}
                onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                type="date"
                value={eventForm.endDate}
                onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.endDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={eventForm.endTime}
                onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
            <input
              type="text"
              value={eventForm.venue}
              onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.venue ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter venue location"
            />
            {errors.venue && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.venue}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Tickets</label>
              <input
                type="number"
                value={eventForm.totalTickets}
                onChange={(e) => setEventForm({ ...eventForm, totalTickets: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Price ($)</label>
              <input
                type="number"
                value={eventForm.price}
                onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={resetEventForm}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Event Management Platform</h1>
              <p className="text-gray-600">Manage your events, tickets, and attendees in one place</p>
            </div>
            <button
              onClick={() => setShowEventForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-xl shadow-sm border">
            <div className="p-6">
              <nav className="space-y-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'dashboard' && (
              <Dashboard
                events={events}
                campaigns={campaigns}
                tickets={tickets}
                setShowEventForm={setShowEventForm}
                handleEditEvent={handleEditEvent}
                handleDeleteEvent={handleDeleteEvent}
              />
            )}
            {activeTab === 'events' && (
              <Dashboard
                events={events}
                campaigns={campaigns}
                tickets={tickets}
                setShowEventForm={setShowEventForm}
                handleEditEvent={handleEditEvent}
                handleDeleteEvent={handleDeleteEvent}
              />
            )}
            {activeTab === 'ticketing' && <Ticketing />}
            {activeTab === 'marketing' && <Marketing />}
            {activeTab === 'attendees' && <AttendeeManagement />}
            {activeTab === 'analytics' && (
              <Analytics
                events={events}
                campaigns={campaigns}
                tickets={tickets}
              />
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showEventForm && <EventFormModal />}
    </div>
  );
};

export default EventManagementApp;