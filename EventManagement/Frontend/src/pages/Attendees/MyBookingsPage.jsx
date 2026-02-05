import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Ticket, QrCode, Download, Share2, Edit, Trash2, RefreshCw, AlertCircle, CheckCircle, XCircle, CreditCard, Mail, Phone, User } from 'lucide-react';

const MyBookingPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      eventName: 'Tech Conference 2025',
      eventDate: '2025-10-15',
      eventTime: '09:00 AM - 06:00 PM',
      venue: 'Convention Center, San Francisco',
      status: 'confirmed',
      bookingDate: '2025-08-15',
      totalAmount: 599,
      tickets: [
        {
          id: 'TK-001-VIP',
          type: 'VIP Pass',
          holder: 'John Doe',
          price: 599,
          qrCode: 'VIP12345',
          benefits: ['VIP lounge access', 'Meet & greet', 'Premium swag']
        }
      ],
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card ****4532',
      refundable: true,
      transferable: true,
      cancellationDeadline: '2025-10-01'
    },
    {
      id: 'BK002',
      eventName: 'Design Summit 2025',
      eventDate: '2025-11-20',
      eventTime: '10:00 AM - 05:00 PM',
      venue: 'Art Museum, New York',
      status: 'confirmed',
      bookingDate: '2025-07-20',
      totalAmount: 298,
      tickets: [
        {
          id: 'TK-002-EB',
          type: 'Early Bird',
          holder: 'John Doe',
          price: 149,
          qrCode: 'EB67890',
          benefits: ['20% discount', 'Priority seating']
        },
        {
          id: 'TK-003-EB',
          type: 'Early Bird',
          holder: 'Jane Doe',
          price: 149,
          qrCode: 'EB67891',
          benefits: ['20% discount', 'Priority seating']
        }
      ],
      paymentStatus: 'paid',
      paymentMethod: 'PayPal',
      refundable: true,
      transferable: true,
      cancellationDeadline: '2025-11-05'
    },
    {
      id: 'BK003',
      eventName: 'AI Workshop Series',
      eventDate: '2025-12-10',
      eventTime: '02:00 PM - 06:00 PM',
      venue: 'Tech Hub, Seattle',
      status: 'pending',
      bookingDate: '2025-09-20',
      totalAmount: 199,
      tickets: [
        {
          id: 'TK-004-GA',
          type: 'General Admission',
          holder: 'John Doe',
          price: 199,
          qrCode: 'GA11223',
          benefits: ['Workshop materials', 'Certificate']
        }
      ],
      paymentStatus: 'pending',
      paymentMethod: 'Bank Transfer',
      refundable: false,
      transferable: false,
      cancellationDeadline: '2025-11-25'
    }
  ]);

  const [pastBookings] = useState([
    {
      id: 'BK004',
      eventName: 'DevCon 2024',
      eventDate: '2024-09-15',
      eventTime: '09:00 AM - 06:00 PM',
      venue: 'Tech Center, San Francisco',
      status: 'completed',
      bookingDate: '2024-07-10',
      totalAmount: 399,
      tickets: [
        {
          id: 'TK-005-GA',
          type: 'General Admission',
          holder: 'John Doe',
          price: 399,
          attended: true
        }
      ],
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card ****4532'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      case 'completed':
        return <CheckCircle size={16} className="text-blue-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const handleDownloadTicket = (booking) => {
    alert(`Downloading tickets for ${booking.eventName}`);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
    setShowCancelModal(false);
    alert('Booking cancelled successfully. Refund will be processed within 3-5 business days.');
  };

  const handleTransferTicket = (booking) => {
    alert(`Transfer functionality for ${booking.eventName} - Feature coming soon!`);
  };

  const BookingCard = ({ booking, isPast = false }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.eventName}</h3>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(booking.eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{booking.eventTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{booking.venue}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(booking.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600">${booking.totalAmount}</div>
            <div className="text-sm text-gray-600">{booking.tickets.length} ticket{booking.tickets.length > 1 ? 's' : ''}</div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-3">Ticket Details:</h4>
          <div className="space-y-2">
            {booking.tickets.map((ticket, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                <div className="flex items-center gap-3">
                  <Ticket className="text-blue-600" size={16} />
                  <div>
                    <div className="font-medium">{ticket.type}</div>
                    <div className="text-sm text-gray-600">{ticket.holder}</div>
                    <div className="text-xs text-gray-500">#{ticket.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${ticket.price}</div>
                  {!isPast && (
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      View QR
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-gray-600" />
            <span className="text-sm text-gray-600">
              Payment: {booking.paymentMethod}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            booking.paymentStatus === 'paid' 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {!isPast && booking.status === 'confirmed' && (
            <>
              <button
                onClick={() => handleDownloadTicket(booking)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download size={16} />
                Download Tickets
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Share2 size={16} />
                Share
              </button>

              {booking.transferable && (
                <button
                  onClick={() => handleTransferTicket(booking)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <User size={16} />
                  Transfer
                </button>
              )}

              {booking.refundable && new Date(booking.cancellationDeadline) > new Date() && (
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowCancelModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Cancel Booking
                </button>
              )}
            </>
          )}

          {booking.status === 'pending' && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <CreditCard size={16} />
              Complete Payment
            </button>
          )}

          {isPast && (
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download size={16} />
              Download Receipt
            </button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</span>
            <span>Booking ID: {booking.id}</span>
          </div>
          {!isPast && booking.refundable && (
            <div className="text-xs text-gray-500 mt-1">
              Cancellable until: {new Date(booking.cancellationDeadline).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const UpcomingBookings = () => {
    const upcomingBookings = bookings.filter(b => new Date(b.eventDate) >= new Date());
    
    if (upcomingBookings.length === 0) {
      return (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming events</h3>
          <p className="mt-1 text-sm text-gray-500">
            Book your next event to see it here.
          </p>
          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Browse Events
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {upcomingBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    );
  };

  const PastBookings = () => {
    const allPastBookings = [...pastBookings, ...bookings.filter(b => new Date(b.eventDate) < new Date())];
    
    if (allPastBookings.length === 0) {
      return (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No past events</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your event history will appear here.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {allPastBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} isPast={true} />
        ))}
      </div>
    );
  };

  const CancellationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Cancel Booking</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to cancel your booking for "{selectedBooking?.eventName}"?
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-yellow-600 mt-0.5" size={16} />
            <div className="text-sm">
              <p className="text-yellow-800 font-medium">Cancellation Policy:</p>
              <ul className="text-yellow-700 mt-1 space-y-1">
                <li>• Full refund if cancelled before {new Date(selectedBooking?.cancellationDeadline || '').toLocaleDateString()}</li>
                <li>• Refund will be processed within 3-5 business days</li>
                <li>• Processing fee may apply</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCancelModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Keep Booking
          </button>
          <button
            onClick={() => handleCancelBooking(selectedBooking?.id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );

  const BookingStats = () => {
    const totalBookings = bookings.length + pastBookings.length;
    const upcomingCount = bookings.filter(b => new Date(b.eventDate) >= new Date()).length;
    const totalSpent = [...bookings, ...pastBookings].reduce((sum, b) => sum + b.totalAmount, 0);
    const totalTickets = [...bookings, ...pastBookings].reduce((sum, b) => sum + b.tickets.length, 0);

    return (
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            </div>
            <Ticket className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-green-600">{upcomingCount}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-blue-600">{totalTickets}</p>
            </div>
            <QrCode className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-orange-600">${totalSpent}</p>
            </div>
            <CreditCard className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <BookingStats />

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Events ({bookings.filter(b => new Date(b.eventDate) >= new Date()).length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events ({pastBookings.length + bookings.filter(b => new Date(b.eventDate) < new Date()).length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'upcoming' && <UpcomingBookings />}
        {activeTab === 'past' && <PastBookings />}

        {/* Cancellation Modal */}
        {showCancelModal && <CancellationModal />}
      </div>
    </div>
  );
};

export default MyBookingPage;