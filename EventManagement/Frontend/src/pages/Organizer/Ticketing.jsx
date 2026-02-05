import React, { useState } from 'react';
import { Plus, Tag, X, Save, AlertCircle, Edit, Trash2, Eye } from 'lucide-react';

const Ticketing = () => {
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [tickets, setTickets] = useState([
        {
            id: 1,
            eventId: 1,
            type: 'General Admission',
            price: 25,
            quantity: 100,
            sold: 10,
            available: 90,
            description: 'Standard entry ticket'
        },
        {
            id: 2,
            eventId: 1,
            type: 'VIP Tickets',
            price: 50,
            quantity: 100,
            sold: 20,
            available: 80,
            description: 'Premium experience with exclusive access'
        },
        {
            id: 3,
            eventId: 1,
            type: 'Early Bird',
            price: 75,
            quantity: 100,
            sold: 30,
            available: 70,
            description: 'Limited time discounted tickets'
        }
    ]);

    const [events] = useState([
        {
            id: 1,
            title: "Tech Conference 2025",
            category: "Conference"
        }
    ]);

    const [ticketForm, setTicketForm] = useState({
        eventId: '',
        type: '',
        price: '',
        quantity: '',
        description: ''
    });

    const [editingTicket, setEditingTicket] = useState(null);
    const [errors, setErrors] = useState({});

    const ticketTypes = ['General Admission', 'VIP Tickets', 'Early Bird', 'Group Tickets', 'Student/Senior', 'Complimentary'];

    const validateTicketForm = () => {
        const newErrors = {};

        if (!ticketForm.eventId) {
            newErrors.eventId = 'Please select an event';
        }

        if (!ticketForm.type) {
            newErrors.type = 'Please select a ticket type';
        }

        if (!ticketForm.price || isNaN(ticketForm.price) || parseFloat(ticketForm.price) < 0) {
            newErrors.price = 'Please enter a valid price';
        }

        if (!ticketForm.quantity || isNaN(ticketForm.quantity) || parseInt(ticketForm.quantity) <= 0) {
            newErrors.quantity = 'Please enter a valid quantity';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTicket = () => {
        if (!validateTicketForm()) return;

        const newTicket = {
            id: tickets.length + 1,
            ...ticketForm,
            price: parseFloat(ticketForm.price),
            quantity: parseInt(ticketForm.quantity),
            sold: 0,
            available: parseInt(ticketForm.quantity)
        };

        setTickets([...tickets, newTicket]);
        resetForm();
    };

    const handleEditTicket = (ticket) => {
        setEditingTicket(ticket.id);
        setTicketForm({
            eventId: ticket.eventId.toString(),
            type: ticket.type,
            price: ticket.price.toString(),
            quantity: ticket.quantity.toString(),
            description: ticket.description
        });
        setShowTicketForm(true);
    };

    const handleUpdateTicket = () => {
        if (!validateTicketForm()) return;

        setTickets(tickets.map(ticket =>
            ticket.id === editingTicket
                ? {
                    ...ticket,
                    ...ticketForm,
                    price: parseFloat(ticketForm.price),
                    quantity: parseInt(ticketForm.quantity),
                    available: parseInt(ticketForm.quantity) - ticket.sold
                }
                : ticket
        ));
        resetForm();
    };

    const handleDeleteTicket = (id) => {
        setTickets(tickets.filter(ticket => ticket.id !== id));
    };

    const resetForm = () => {
        setTicketForm({
            eventId: '',
            type: '',
            price: '',
            quantity: '',
            description: ''
        });
        setShowTicketForm(false);
        setEditingTicket(null);
        setErrors({});
    };

    const TicketFormModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                        {editingTicket ? 'Edit Ticket Type' : 'Create Ticket Type'}
                    </h3>
                    <button
                        onClick={resetForm}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event *</label>
                        <select
                            value={ticketForm.eventId}
                            onChange={(e) => setTicketForm({ ...ticketForm, eventId: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.eventId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Select event</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                        {errors.eventId && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.eventId}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Type *</label>
                        <select
                            value={ticketForm.type}
                            onChange={(e) => setTicketForm({ ...ticketForm, type: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.type ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Select type</option>
                            {ticketTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.type && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.type}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={ticketForm.price}
                            onChange={(e) => setTicketForm({ ...ticketForm, price: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.price ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="0.00"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                        <input
                            type="number"
                            min="1"
                            value={ticketForm.quantity}
                            onChange={(e) => setTicketForm({ ...ticketForm, quantity: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="0"
                        />
                        {errors.quantity && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.quantity}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={ticketForm.description}
                            onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Ticket description and benefits"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={resetForm}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={editingTicket ? handleUpdateTicket : handleCreateTicket}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Ticketing System</h2>
                            <p className="text-gray-600 mt-1">Manage ticket types, pricing, and availability for your events.</p>
                        </div>
                        <button
                            onClick={() => setShowTicketForm(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Ticket Type
                        </button>
                    </div>

                    {/* Ticket Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Ticket Types</p>
                                    <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
                                </div>
                                <Tag className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Available</p>
                                    <p className="text-2xl font-bold text-gray-900">{tickets.reduce((sum, ticket) => sum + ticket.available, 0)}</p>
                                </div>
                                <Tag className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Sold</p>
                                    <p className="text-2xl font-bold text-gray-900">{tickets.reduce((sum, ticket) => sum + ticket.sold, 0)}</p>
                                </div>
                                <Tag className="w-8 h-8 text-purple-600" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${tickets.reduce((sum, ticket) => sum + (ticket.sold * ticket.price), 0).toLocaleString()}
                                    </p>
                                </div>
                                <Tag className="w-8 h-8 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    {/* Ticket Types Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {tickets.map((ticket) => {
                            const soldPercentage = (ticket.sold / ticket.quantity) * 100;
                            return (
                                <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{ticket.type}</h3>
                                        <Tag className="w-5 h-5 text-green-600" />
                                    </div>


                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Price:</span>
                                            <span className="font-semibold text-gray-900">${ticket.price}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Available:</span>
                                            <span className="font-semibold text-gray-900">{ticket.available}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Sold:</span>
                                            <span className="font-semibold text-gray-900">{ticket.sold}</span>
                                        </div>

                                        {ticket.description && (
                                            <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>Progress</span>
                                            <span>{Math.round(soldPercentage)}% sold</span>
                                        </div>
                                        <div className="bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${soldPercentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 mt-6">
                                        <button
                                            onClick={() => handleEditTicket(ticket)}
                                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTicket(ticket.id)}
                                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {tickets.length === 0 && (
                        <div className="text-center py-12">
                            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No ticket types created yet</h3>
                            <p className="text-gray-600 mb-4">Create your first ticket type to start selling tickets for your events.</p>
                            <button
                                onClick={() => setShowTicketForm(true)}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
                                Create First Ticket Type
                            </button>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showTicketForm && <TicketFormModal />}
            </div>
        </div>
    );
};

export default Ticketing;