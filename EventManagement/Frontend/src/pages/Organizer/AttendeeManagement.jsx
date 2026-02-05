import React, { useState } from 'react';
import {
    Users,
    CheckCircle,
    Clock,
    X,
    Search,
    Filter,
    Plus,
    Mail,
    Download,
    Eye,
    Edit,
    Trash2,
    UserPlus,
    MessageSquare,
    FileText,
    Calendar
} from 'lucide-react';

const AttendeeManagement = () => {
    const [attendees, setAttendees] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 234-567-8901",
            event: "Tech Conference 2025",
            eventId: 1,
            ticket: "VIP",
            status: "Checked In",
            registrationDate: "2024-10-01",
            checkInTime: "2024-10-15 09:30"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1 234-567-8902",
            event: "Tech Conference 2025",
            eventId: 1,
            ticket: "General",
            status: "Registered",
            registrationDate: "2024-10-05",
            checkInTime: null
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+1 234-567-8903",
            event: "Tech Conference 2025",
            eventId: 1,
            ticket: "Early Bird",
            status: "Pending",
            registrationDate: "2024-09-28",
            checkInTime: null
        },
        {
            id: 4,
            name: "Sarah Wilson",
            email: "sarah@example.com",
            phone: "+1 234-567-8904",
            event: "Tech Conference 2025",
            eventId: 1,
            ticket: "General",
            status: "No Show",
            registrationDate: "2024-10-03",
            checkInTime: null
        }
    ]);

    const [events] = useState([
        { id: 1, title: "Tech Conference 2025" },
        { id: 2, title: "Marketing Summit 2025" }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [eventFilter, setEventFilter] = useState('all');
    const [showAddAttendeeModal, setShowAddAttendeeModal] = useState(false);
    const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
    const [selectedAttendees, setSelectedAttendees] = useState([]);
    const [viewingAttendee, setViewingAttendee] = useState(null);

    const [attendeeForm, setAttendeeForm] = useState({
        name: '',
        email: '',
        phone: '',
        eventId: '',
        ticket: 'General'
    });

    const [bulkEmailForm, setBulkEmailForm] = useState({
        subject: '',
        message: '',
        recipientType: 'all' // all, selected, byStatus
    });

    const [errors, setErrors] = useState({});

    const ticketTypes = ['General', 'VIP', 'Early Bird', 'Student'];
    const statusTypes = ['Registered', 'Checked In', 'Pending', 'No Show'];

    // Filter attendees based on search and filters
    const filteredAttendees = attendees.filter(attendee => {
        const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || attendee.status === statusFilter;
        const matchesEvent = eventFilter === 'all' || attendee.eventId.toString() === eventFilter;

        return matchesSearch && matchesStatus && matchesEvent;
    });

    // Get statistics
    const stats = {
        total: attendees.length,
        checkedIn: attendees.filter(a => a.status === 'Checked In').length,
        pending: attendees.filter(a => a.status === 'Pending').length,
        noShows: attendees.filter(a => a.status === 'No Show').length
    };

    // Validation
    const validateAttendeeForm = () => {
        const newErrors = {};

        if (!attendeeForm.name || attendeeForm.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!attendeeForm.email || !/\S+@\S+\.\S+/.test(attendeeForm.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!attendeeForm.eventId) {
            newErrors.eventId = 'Please select an event';
        }

        // Check for duplicate email
        if (attendees.some(a => a.email === attendeeForm.email)) {
            newErrors.email = 'Email already registered';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // CRUD Operations
    const handleAddAttendee = () => {
        if (!validateAttendeeForm()) return;

        const event = events.find(e => e.id.toString() === attendeeForm.eventId);
        const newAttendee = {
            id: attendees.length + 1,
            ...attendeeForm,
            eventId: parseInt(attendeeForm.eventId),
            event: event.title,
            status: 'Registered',
            registrationDate: new Date().toISOString().split('T')[0],
            checkInTime: null
        };

        setAttendees([...attendees, newAttendee]);
        resetAttendeeForm();
    };

    const handleUpdateStatus = (attendeeId, newStatus) => {
        setAttendees(attendees.map(attendee =>
            attendee.id === attendeeId
                ? {
                    ...attendee,
                    status: newStatus,
                    checkInTime: newStatus === 'Checked In' ? new Date().toISOString() : null
                }
                : attendee
        ));
    };

    const handleDeleteAttendee = (attendeeId) => {
        if (window.confirm('Are you sure you want to delete this attendee?')) {
            setAttendees(attendees.filter(a => a.id !== attendeeId));
        }
    };

    const handleBulkCheckIn = () => {
        const checkedInIds = selectedAttendees;
        setAttendees(attendees.map(attendee =>
            checkedInIds.includes(attendee.id)
                ? { ...attendee, status: 'Checked In', checkInTime: new Date().toISOString() }
                : attendee
        ));
        setSelectedAttendees([]);
    };

    const resetAttendeeForm = () => {
        setAttendeeForm({
            name: '',
            email: '',
            phone: '',
            eventId: '',
            ticket: 'General'
        });
        setShowAddAttendeeModal(false);
        setErrors({});
    };

    const handleSelectAttendee = (attendeeId) => {
        setSelectedAttendees(prev =>
            prev.includes(attendeeId)
                ? prev.filter(id => id !== attendeeId)
                : [...prev, attendeeId]
        );
    };

    const handleSelectAll = () => {
        if (selectedAttendees.length === filteredAttendees.length) {
            setSelectedAttendees([]);
        } else {
            setSelectedAttendees(filteredAttendees.map(a => a.id));
        }
    };

    // Modals
    const AddAttendeeModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Add New Attendee</h3>
                    <button onClick={resetAttendeeForm} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                            type="text"
                            value={attendeeForm.name}
                            onChange={(e) => setAttendeeForm({ ...attendeeForm, name: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter full name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                            type="email"
                            value={attendeeForm.email}
                            onChange={(e) => setAttendeeForm({ ...attendeeForm, email: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={attendeeForm.phone}
                            onChange={(e) => setAttendeeForm({ ...attendeeForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event *</label>
                        <select
                            value={attendeeForm.eventId}
                            onChange={(e) => setAttendeeForm({ ...attendeeForm, eventId: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.eventId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Select event</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                        {errors.eventId && <p className="text-red-500 text-sm mt-1">{errors.eventId}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Type</label>
                        <select
                            value={attendeeForm.ticket}
                            onChange={(e) => setAttendeeForm({ ...attendeeForm, ticket: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {ticketTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={resetAttendeeForm}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddAttendee}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Add Attendee
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const AttendeeDetailsModal = () => {
        if (!viewingAttendee) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-2xl w-full">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Attendee Details</h3>
                        <button onClick={() => setViewingAttendee(null)} className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                                <p className="text-lg font-semibold text-gray-900">{viewingAttendee.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${viewingAttendee.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                                        viewingAttendee.status === 'Registered' ? 'bg-green-100 text-green-800' :
                                            viewingAttendee.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'
                                    }`}>
                                    {viewingAttendee.status}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <p className="text-gray-900">{viewingAttendee.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                <p className="text-gray-900">{viewingAttendee.phone || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Event</label>
                                <p className="text-gray-900">{viewingAttendee.event}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Ticket Type</label>
                                <p className="text-gray-900">{viewingAttendee.ticket}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Registration Date</label>
                                <p className="text-gray-900">{viewingAttendee.registrationDate}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Check-in Time</label>
                                <p className="text-gray-900">{viewingAttendee.checkInTime || 'Not checked in'}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <button
                                onClick={() => handleUpdateStatus(viewingAttendee.id, 'Checked In')}
                                disabled={viewingAttendee.status === 'Checked In'}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Check In
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Send Email
                            </button>
                            <button
                                onClick={() => handleDeleteAttendee(viewingAttendee.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">Attendee Management</h2>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search attendees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="all">All Status</option>
                        {statusTypes.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="all">All Events</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>{event.title}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setShowAddAttendeeModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Attendee
                    </button>
                </div>
            </div>

            {/* Attendee Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-sm text-gray-600">Total Attendees</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.checkedIn}</p>
                    <p className="text-sm text-gray-600">Checked In</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <X className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.noShows}</p>
                    <p className="text-sm text-gray-600">No Shows</p>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedAttendees.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-green-800 font-medium">
                            {selectedAttendees.length} attendee{selectedAttendees.length !== 1 ? 's' : ''} selected
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleBulkCheckIn}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                Bulk Check-in
                            </button>
                            <button
                                onClick={() => setShowBulkEmailModal(true)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Send Email
                            </button>
                            <button
                                onClick={() => setSelectedAttendees([])}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Attendee List */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                        Attendee List ({filteredAttendees.length})
                    </h3>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={() => setShowBulkEmailModal(true)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Bulk Email
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedAttendees.length === filteredAttendees.length && filteredAttendees.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAttendees.map((attendee) => (
                                <tr key={attendee.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedAttendees.includes(attendee.id)}
                                            onChange={() => handleSelectAttendee(attendee.id)}
                                            className="rounded border-gray-300"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{attendee.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{attendee.event}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {attendee.ticket}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={attendee.status}
                                            onChange={(e) => handleUpdateStatus(attendee.id, e.target.value)}
                                            className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full border-0 focus:ring-2 focus:ring-green-500 ${attendee.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                                                    attendee.status === 'Registered' ? 'bg-green-100 text-green-800' :
                                                        attendee.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {statusTypes.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {attendee.registrationDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setViewingAttendee(attendee)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAttendee(attendee.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredAttendees.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No attendees found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showAddAttendeeModal && <AddAttendeeModal />}
            {viewingAttendee && <AttendeeDetailsModal />}
        </div>
    );
};

export default AttendeeManagement;