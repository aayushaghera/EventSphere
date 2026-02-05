import React, { useState } from 'react';
import { Plus, Calendar, Users, DollarSign, BarChart3, Tag, Clock, CheckCircle, X, Upload, Image as ImageIcon, Video, FileText } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <Icon className={`w-8 h-8 ${color}`} />
        </div>
    </div>
);

const Section = ({ title, children, actions }) => (
    <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div>{actions}</div>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const EmptyState = ({ message, action }) => (
    <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No events yet</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {action}
    </div>
);

const EventCreationForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        eventBanner: null,
        eventGallery: [],
        eventVideo: '',
        eventLogo: null,
        totalTickets: 100,
        ticketPrice: 0,
        venue: '',
        organizer: ''
    });

    const [errors, setErrors] = useState({});

    const eventCategories = [
        'Conference',
        'Entertainment', 
        'Sports',
        'Workshop',
        'Cultural',
        'Networking'
    ];

    const validateForm = () => {
        const newErrors = {};

        // Event Title validation
        if (!formData.title.trim()) {
            newErrors.title = "Event title must be 10-200 characters";
        } else if (formData.title.length < 10 || formData.title.length > 200) {
            newErrors.title = "Event title must be 10-200 characters";
        }

        // Event Category validation
        if (!formData.category) {
            newErrors.category = "Please select event category";
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = "Description required (max 2000 characters)";
        } else if (formData.description.length > 2000) {
            newErrors.description = "Description required (max 2000 characters)";
        }

        // Start Date & Time validation
        if (!formData.startDate || !formData.startTime) {
            newErrors.startDateTime = "Event must be scheduled for future date";
        } else {
            const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
            const now = new Date();
            if (startDateTime <= now) {
                newErrors.startDateTime = "Event must be scheduled for future date";
            }
        }

        // End Date & Time validation
        if (!formData.endDate || !formData.endTime) {
            newErrors.endDateTime = "End time must be after start time";
        } else if (formData.startDate && formData.startTime) {
            const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
            const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
            if (endDateTime <= startDateTime) {
                newErrors.endDateTime = "End time must be after start time";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear specific error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleFileUpload = (field, file) => {
        if (field === 'eventGallery') {
            if (formData.eventGallery.length < 10) {
                setFormData(prev => ({
                    ...prev,
                    eventGallery: [...prev.eventGallery, file]
                }));
            }
        } else {
            // Check file size for banner and logo (max 5MB)
            if (file && file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            setFormData(prev => ({
                ...prev,
                [field]: file
            }));
        }
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            eventGallery: prev.eventGallery.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newEvent = {
                id: Date.now(),
                ...formData,
                status: 'Draft',
                ticketsSold: 0,
                revenue: 0,
                createdAt: new Date().toISOString()
            };
            onSubmit(newEvent);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Event Creation & Configuration */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Event Creation & Configuration</h3>
                        
                        {/* Event Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter event title (10-200 characters)"
                                maxLength={200}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            <p className="text-gray-500 text-xs mt-1">{formData.title.length}/200 characters</p>
                        </div>

                        {/* Event Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select event category</option>
                                {eventCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Describe your event (max 2000 characters)"
                                maxLength={2000}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            <p className="text-gray-500 text-xs mt-1">{formData.description.length}/2000 characters</p>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date & Time <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                                        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.startDateTime ? 'border-red-500' : 'border-gray-300'}`}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                                        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.startDateTime ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.startDateTime && <p className="text-red-500 text-sm mt-1">{errors.startDateTime}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date & Time <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                                        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.endDateTime ? 'border-red-500' : 'border-gray-300'}`}
                                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                                        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.endDateTime ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.endDateTime && <p className="text-red-500 text-sm mt-1">{errors.endDateTime}</p>}
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Tickets</label>
                                <input
                                    type="number"
                                    value={formData.totalTickets}
                                    onChange={(e) => handleInputChange('totalTickets', parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Price ($)</label>
                                <input
                                    type="number"
                                    value={formData.ticketPrice}
                                    onChange={(e) => handleInputChange('ticketPrice', parseFloat(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                                <input
                                    type="text"
                                    value={formData.venue}
                                    onChange={(e) => handleInputChange('venue', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    placeholder="Event venue location"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Event Media Management */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Event Media Management</h3>
                        
                        {/* Event Banner */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Banner <span className="text-gray-500">(Main promotional image, max 5MB)</span>
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                {formData.eventBanner ? (
                                    <div className="space-y-2">
                                        <ImageIcon className="w-8 h-8 text-green-500 mx-auto" />
                                        <p className="text-sm text-gray-600">{formData.eventBanner.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange('eventBanner', null)}
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload banner image</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload('eventBanner', e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Event Gallery */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Gallery <span className="text-gray-500">(Multiple event photos, up to 10 images)</span>
                            </label>
                            <div className="space-y-2">
                                {formData.eventGallery.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <span className="text-sm text-gray-600">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(index)}
                                            className="text-red-500 hover:underline text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                {formData.eventGallery.length < 10 && (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        <label className="cursor-pointer">
                                            <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Add gallery image ({formData.eventGallery.length}/10)</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload('eventGallery', e.target.files[0])}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Event Video */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Video <span className="text-gray-500">(Promotional video link - YouTube/Vimeo)</span>
                            </label>
                            <input
                                type="url"
                                value={formData.eventVideo}
                                onChange={(e) => handleInputChange('eventVideo', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>

                        {/* Event Logo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Logo <span className="text-gray-500">(Organization/event logo)</span>
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                {formData.eventLogo ? (
                                    <div className="space-y-2">
                                        <FileText className="w-8 h-8 text-green-500 mx-auto" />
                                        <p className="text-sm text-gray-600">{formData.eventLogo.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange('eventLogo', null)}
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload logo</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload('eventLogo', e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Dashboard = ({
    events = [],
    campaigns = [],
    tickets = [],
    setShowEventForm,
    handleEditEvent,
    handleDeleteEvent
}) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [allEvents, setAllEvents] = useState(events);

    // Calculate statistics
    const stats = {
        totalEvents: allEvents.length,
        totalAttendees: allEvents.reduce((sum, event) => sum + (event.ticketsSold || 0), 0),
        totalRevenue: allEvents.reduce((sum, event) => sum + (event.revenue || 0), 0),
        activeCampaigns: campaigns.filter(c => c.status === 'Active').length
    };

    // Get upcoming events (next 7 days)
    const upcomingEvents = allEvents.filter(event => {
        const eventDate = new Date(event.startDate);
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= nextWeek;
    });

    // Get recent events for display
    const recentEvents = allEvents.slice(0, 5);

    const handleCreateEvent = (newEvent) => {
        setAllEvents(prev => [...prev, newEvent]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                    <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your events.</p>
                </div>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Event
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Events"
                    value={stats.totalEvents}
                    icon={Calendar}
                    color="text-green-600"
                />
                <StatCard
                    title="Total Attendees"
                    value={stats.totalAttendees.toLocaleString()}
                    icon={Users}
                    color="text-green-600"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-purple-600"
                />
                <StatCard
                    title="Active Campaigns"
                    value={stats.activeCampaigns}
                    icon={BarChart3}
                    color="text-orange-600"
                />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Event Status</h3>
                        <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Active Events:</span>
                            <span className="font-semibold text-green-600">
                                {allEvents.filter(e => e.status === 'Active').length}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Draft Events:</span>
                            <span className="font-semibold text-yellow-600">
                                {allEvents.filter(e => e.status === 'Draft').length}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Completed:</span>
                            <span className="font-semibold text-gray-600">
                                {allEvents.filter(e => e.status === 'Completed').length}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Ticket Sales</h3>
                        <Tag className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tickets Sold:</span>
                            <span className="font-semibold text-green-600">
                                {stats.totalAttendees}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Available:</span>
                            <span className="font-semibold text-green-600">
                                {allEvents.reduce((sum, event) => sum + (event.totalTickets || 0) - (event.ticketsSold || 0), 0)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Conversion:</span>
                            <span className="font-semibold text-purple-600">
                                {allEvents.length > 0 ? Math.round((stats.totalAttendees / allEvents.reduce((sum, event) => sum + (event.totalTickets || 100), 0)) * 100) : 0}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">This Month:</span>
                            <span className="font-semibold text-green-600">
                                ${Math.round(stats.totalRevenue * 0.3).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Last Month:</span>
                            <span className="font-semibold text-gray-600">
                                ${Math.round(stats.totalRevenue * 0.25).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Growth:</span>
                            <span className="font-semibold text-green-600">+20%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <Section
                title={`Upcoming Events (${upcomingEvents.length})`}
                actions={
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                        View All
                    </button>
                }
            >
                {upcomingEvents.length === 0 ? (
                    <EmptyState
                        message="No upcoming events in the next 7 days. Create one to get started!"
                        action={
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
                                Create Your First Event
                            </button>
                        }
                    />
                ) : (
                    <div className="space-y-4">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {event.startDate} at {event.startTime || '9:00 AM'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Tag className="w-4 h-4" />
                                            {event.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {event.ticketsSold || 0}/{event.totalTickets || 100} tickets
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            event.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {event.status}
                                    </span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleEditEvent && handleEditEvent(event)}
                                            className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors"
                                            title="Edit Event"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEvent && handleDeleteEvent(event.id)}
                                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            title="Delete Event"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Section>

            {/* Recent Activity */}
            <Section title="Recent Events">
                {recentEvents.length === 0 ? (
                    <EmptyState message="No events created yet. Create your first event to get started!" />
                ) : (
                    <div className="space-y-4">
                        {recentEvents.map(event => {
                            const salesPercentage = event.totalTickets ? Math.round((event.ticketsSold || 0) / event.totalTickets * 100) : 0;

                            return (
                                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {event.startDate}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-4 h-4" />
                                                {event.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                ${(event.revenue || 0).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Sales Progress Bar */}
                                        <div className="mt-2">
                                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                <span>Sales Progress</span>
                                                <span>{salesPercentage}% sold</span>
                                            </div>
                                            <div className="bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${salesPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                event.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                                                    event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {event.status}
                                        </span>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEditEvent && handleEditEvent(event)}
                                                className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors"
                                                title="Edit Event"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent && handleDeleteEvent(event.id)}
                                                className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                title="Delete Event"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Section>

            {/* Quick Actions */}
            <Section title="Quick Actions">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center group"
                    >
                        <Plus className="w-8 h-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600 group-hover:text-green-600">Create New Event</p>
                    </button>

                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center group">
                        <Tag className="w-8 h-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600 group-hover:text-green-600">Add Ticket Type</p>
                    </button>

                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center group">
                        <BarChart3 className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600">Create Campaign</p>
                    </button>

                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-center group">
                        <Users className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600">View Attendees</p>
                    </button>
                </div>
            </Section>

            {/* Event Creation Form Modal */}
            {showCreateForm && (
                <EventCreationForm
                    onClose={() => setShowCreateForm(false)}
                    onSubmit={handleCreateEvent}
                />
            )}
        </div>
    );
};

export default Dashboard;