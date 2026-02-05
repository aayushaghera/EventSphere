import React, { useState } from 'react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Clock,
    MapPin,
    Users,
    DollarSign,
    CheckCircle,
    AlertCircle,
    XCircle,
    MoreHorizontal
} from 'lucide-react';

const BookingCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date('2025-09-20'));
    const [selectedDate, setSelectedDate] = useState(new Date('2025-09-20'));
    const [viewMode, setViewMode] = useState('month');

    const bookings = [
        { id: 1, title: 'Annual Tech Summit', venueId: 1, date: new Date(2025, 8, 15), startTime: '09:00', endTime: '17:00', status: 'confirmed' },
        { id: 2, title: 'Marketing Workshop', venueId: 2, date: new Date(2025, 8, 20), startTime: '10:00', endTime: '13:00', status: 'pending' },
        { id: 3, title: 'Product Launch Event', venueId: 1, date: new Date(2025, 8, 20), startTime: '18:00', endTime: '22:00', status: 'confirmed' },
        { id: 4, title: 'Cancelled Booking', venueId: 3, date: new Date(2025, 8, 22), startTime: '14:00', endTime: '16:00', status: 'cancelled' },
    ];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = Array(startingDayOfWeek).fill(null);
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        return days;
    };

    const getBookingsForDate = (date) => date ? bookings.filter(b => b.date.toDateString() === date.toDateString()) : [];
    
    const getStatusInfo = (status) => {
        switch (status) {
            case 'confirmed': return { color: 'border-l-green-500 bg-green-50', icon: <CheckCircle className="w-4 h-4 text-green-500" /> };
            case 'pending': return { color: 'border-l-yellow-500 bg-yellow-50', icon: <AlertCircle className="w-4 h-4 text-yellow-500" /> };
            case 'cancelled': return { color: 'border-l-red-500 bg-red-50', icon: <XCircle className="w-4 h-4 text-red-500" /> };
            default: return { color: 'border-l-gray-500 bg-gray-50', icon: <Clock className="w-4 h-4 text-gray-500" /> };
        }
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Booking Calendar
                    </h1>
                </div>
                <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                     <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-lg flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Booking
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm ">
                    <div className="p-6 border-b flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                            <div className="flex items-center space-x-1">
                                <button onClick={() => navigateMonth(-1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => navigateMonth(1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-medium text-yellow-600 hover:bg-yellow-50 rounded-lg">
                            Today
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-7 gap-px mb-4">
                            {weekDays.map(day => <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                            {getDaysInMonth(currentDate).map((day, index) => {
                                const dayBookings = getBookingsForDate(day);
                                const isToday = day && day.toDateString() === new Date().toDateString();
                                const isSelected = day && day.toDateString() === selectedDate.toDateString();
                                return (
                                    <div key={index} className={`min-h-[120px] bg-white p-2 cursor-pointer ${isSelected ? 'ring-2 ring-yellow-500' : ''}`} onClick={() => day && setSelectedDate(day)}>
                                        {day && (
                                            <>
                                                <div className={`text-sm font-medium mb-2 ${isToday ? 'bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                                                    {day.getDate()}
                                                </div>
                                                <div className="space-y-1">
                                                    {dayBookings.slice(0, 2).map(booking => (
                                                        <div key={booking.id} className={`text-xs p-1 rounded border-l-2 ${getStatusInfo(booking.status).color} truncate`}>
                                                            <div className="font-medium">{booking.title}</div>
                                                        </div>
                                                    ))}
                                                    {dayBookings.length > 2 && <div className="text-xs text-gray-500 font-medium">+{dayBookings.length - 2} more</div>}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Side Panel - Selected Date Details */}
                <div className="bg-white rounded-xl shadow-sm ">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h3>
                    </div>
                    <div className="p-6">
                        {getBookingsForDate(selectedDate).length === 0 ? (
                            <div className="text-center py-8">
                                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No bookings for this date</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {getBookingsForDate(selectedDate).map(booking => (
                                    <div key={booking.id} className={`p-4 rounded-lg border-l-4 ${getStatusInfo(booking.status).color}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900">{booking.title}</h4>
                                            {getStatusInfo(booking.status).icon}
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{booking.startTime} - {booking.endTime}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCalendar;
