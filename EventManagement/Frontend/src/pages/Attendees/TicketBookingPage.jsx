import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, CreditCard, Check, AlertCircle, Ticket, Star, Gift } from 'lucide-react';

const TicketBookingPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [discountCode, setDiscountCode] = useState('');
  const [bookingStep, setBookingStep] = useState('browse'); // browse, select, details, payment, confirmation
  const [attendeeDetails, setAttendeeDetails] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  // Sample events data
  const events = [
    {
      id: 1,
      name: "Tech Conference 2025",
      date: "2025-10-15",
      time: "09:00 AM",
      location: "Convention Center, San Francisco",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      description: "Join industry leaders for cutting-edge tech discussions and networking.",
      ticketTypes: [
        {
          id: 1,
          name: "General Admission",
          price: 299,
          description: "Standard entry with access to all sessions",
          available: 500,
          benefits: ["Access to all sessions", "Lunch included", "Event materials"]
        },
        {
          id: 2,
          name: "VIP Pass",
          price: 599,
          description: "Premium experience with exclusive benefits",
          available: 100,
          benefits: ["All General benefits", "VIP lounge access", "Meet & greet with speakers", "Premium swag bag"]
        },
        {
          id: 3,
          name: "Student Discount",
          price: 149,
          description: "Special pricing for students",
          available: 200,
          benefits: ["Access to all sessions", "Student networking session"]
        }
      ]
    },
    {
      id: 2,
      name: "Design Summit 2025",
      date: "2025-11-20",
      time: "10:00 AM",
      location: "Art Museum, New York",
      category: "Design",
      image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=250&fit=crop",
      description: "Explore the future of design with creative professionals.",
      ticketTypes: [
        {
          id: 1,
          name: "General Admission",
          price: 199,
          description: "Standard entry to all design sessions",
          available: 300,
          benefits: ["Access to all sessions", "Design toolkit", "Networking mixer"]
        },
        {
          id: 2,
          name: "Early Bird",
          price: 149,
          description: "Limited time early bird pricing",
          available: 50,
          benefits: ["All General benefits", "20% discount", "Priority seating"]
        }
      ]
    }
  ];

  // Discount codes
  const discountCodes = {
    'EARLY20': { percent: 20, description: 'Early Bird 20% Off' },
    'GROUP15': { percent: 15, description: 'Group Discount 15% Off', minQuantity: 5 },
    'STUDENT10': { percent: 10, description: 'Student Discount 10% Off' }
  };

  const calculatePricing = () => {
    if (!selectedEvent) return { basePrice: 0, discountAmount: 0, finalPrice: 0 };
    
    let basePrice = 0;
    let totalQuantity = 0;
    
    Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
      const ticket = selectedEvent.ticketTypes.find(t => t.id === parseInt(ticketId));
      if (ticket && quantity > 0) {
        basePrice += ticket.price * quantity;
        totalQuantity += quantity;
      }
    });

    let discountAmount = 0;
    
    // Apply discount code
    if (appliedDiscount) {
      if (appliedDiscount.minQuantity && totalQuantity < appliedDiscount.minQuantity) {
        // Don't apply discount if minimum quantity not met
      } else {
        discountAmount = basePrice * (appliedDiscount.percent / 100);
      }
    }

    return {
      basePrice,
      discountAmount,
      finalPrice: basePrice - discountAmount,
      totalQuantity
    };
  };

  const applyDiscountCode = () => {
    const code = discountCodes[discountCode.toUpperCase()];
    if (code) {
      setAppliedDiscount(code);
    } else {
      alert('Invalid discount code');
    }
  };

  const handleTicketQuantityChange = (ticketId, quantity) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: Math.max(0, quantity)
    }));
  };

  const proceedToDetails = () => {
    const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
    if (totalTickets === 0) {
      alert('Please select at least one ticket');
      return;
    }
    
    // Initialize attendee details
    const details = [];
    Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
      const ticket = selectedEvent.ticketTypes.find(t => t.id === parseInt(ticketId));
      for (let i = 0; i < quantity; i++) {
        details.push({
          ticketId: parseInt(ticketId),
          ticketName: ticket.name,
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
      }
    });
    setAttendeeDetails(details);
    setBookingStep('details');
  };

  const handleAttendeeDetailChange = (index, field, value) => {
    setAttendeeDetails(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const EventBrowser = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Events</h1>
        <div className="flex gap-4 mb-6">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Design</option>
            <option>Business</option>
          </select>
          <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
          <input type="text" placeholder="Search events..." className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 flex-1" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                  {event.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <div className="space-y-2 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-purple-600">
                  From ${Math.min(...event.ticketTypes.map(t => t.price))}
                </div>
                <button 
                  onClick={() => { setSelectedEvent(event); setBookingStep('select'); }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Select Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TicketSelection = () => {
    const pricing = calculatePricing();
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button 
            onClick={() => setBookingStep('browse')}
            className="text-purple-600 hover:text-purple-800 mb-4"
          >
            ← Back to Events
          </button>
          <h1 className="text-3xl font-bold mb-2">{selectedEvent.name}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{selectedEvent.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{selectedEvent.location}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Select Tickets</h2>
            {selectedEvent.ticketTypes.map(ticket => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {ticket.name}
                      {ticket.name.includes('VIP') && <Star className="text-yellow-500" size={20} />}
                      {ticket.name.includes('Student') && <Tag className="text-green-500" size={20} />}
                    </h3>
                    <p className="text-gray-600 mb-2">{ticket.description}</p>
                    <div className="text-sm text-gray-500">
                      {ticket.available} tickets available
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">${ticket.price}</div>
                  </div>
                </div>
                
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

                <div className="flex items-center gap-4">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleTicketQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{selectedTickets[ticket.id] || 0}</span>
                    <button 
                      onClick={() => handleTicketQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                if (quantity === 0) return null;
                const ticket = selectedEvent.ticketTypes.find(t => t.id === parseInt(ticketId));
                return (
                  <div key={ticketId} className="flex justify-between mb-2">
                    <span>{ticket.name} x{quantity}</span>
                    <span>${ticket.price * quantity}</span>
                  </div>
                );
              })}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${pricing.basePrice}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-${pricing.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${pricing.finalPrice}</span>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Discount Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <button 
                    onClick={applyDiscountCode}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <Gift size={14} />
                    {appliedDiscount.description} applied!
                  </div>
                )}
              </div>

              <button 
                onClick={proceedToDetails}
                disabled={pricing.totalQuantity === 0}
                className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Continue to Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AttendeeDetailsForm = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button 
          onClick={() => setBookingStep('select')}
          className="text-purple-600 hover:text-purple-800 mb-4"
        >
          ← Back to Ticket Selection
        </button>
        <h1 className="text-3xl font-bold mb-2">Attendee Details</h1>
        <p className="text-gray-600">Please provide details for each attendee</p>
      </div>

      <div className="space-y-6">
        {attendeeDetails.map((attendee, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Ticket size={20} className="text-purple-600" />
              Attendee {index + 1} - {attendee.ticketName}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input 
                  type="text"
                  value={attendee.firstName}
                  onChange={(e) => handleAttendeeDetailChange(index, 'firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input 
                  type="text"
                  value={attendee.lastName}
                  onChange={(e) => handleAttendeeDetailChange(index, 'lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input 
                  type="email"
                  value={attendee.email}
                  onChange={(e) => handleAttendeeDetailChange(index, 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input 
                  type="tel"
                  value={attendee.phone}
                  onChange={(e) => handleAttendeeDetailChange(index, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button 
          onClick={() => setBookingStep('select')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button 
          onClick={() => setBookingStep('payment')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );

  const PaymentForm = () => {
    const pricing = calculatePricing();
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button 
            onClick={() => setBookingStep('details')}
            className="text-purple-600 hover:text-purple-800 mb-4"
          >
            ← Back to Details
          </button>
          <h1 className="text-3xl font-bold mb-2">Payment</h1>
          <p className="text-gray-600">Complete your booking</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard size={20} />
                Payment Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input 
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input 
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input 
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <input 
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Final Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="font-medium">{selectedEvent.name}</div>
                <div className="text-sm text-gray-600">{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</div>
              </div>
              
              {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                if (quantity === 0) return null;
                const ticket = selectedEvent.ticketTypes.find(t => t.id === parseInt(ticketId));
                return (
                  <div key={ticketId} className="flex justify-between mb-2">
                    <span>{ticket.name} x{quantity}</span>
                    <span>${ticket.price * quantity}</span>
                  </div>
                );
              })}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${pricing.basePrice}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-${pricing.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${pricing.finalPrice}</span>
                </div>
              </div>

              <button 
                onClick={() => setBookingStep('confirmation')}
                className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConfirmationPage = () => (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your tickets have been successfully booked. You'll receive a confirmation email with your tickets and QR codes shortly.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">Booking Details</h3>
          <div className="text-left space-y-2">
            <div><strong>Event:</strong> {selectedEvent.name}</div>
            <div><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</div>
            <div><strong>Time:</strong> {selectedEvent.time}</div>
            <div><strong>Location:</strong> {selectedEvent.location}</div>
            <div><strong>Total Tickets:</strong> {Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0)}</div>
            <div><strong>Total Amount:</strong> ${calculatePricing().finalPrice}</div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => {
              setBookingStep('browse');
              setSelectedEvent(null);
              setSelectedTickets({});
              setAttendeeDetails([]);
              setDiscountCode('');
              setAppliedDiscount(null);
            }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Book More Events
          </button>
          <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50">
            View My Tickets
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {bookingStep === 'browse' && <EventBrowser />}
      {bookingStep === 'select' && <TicketSelection />}
      {bookingStep === 'details' && <AttendeeDetailsForm />}
      {bookingStep === 'payment' && <PaymentForm />}
      {bookingStep === 'confirmation' && <ConfirmationPage />}
    </div>
  );
};

export default TicketBookingPage;