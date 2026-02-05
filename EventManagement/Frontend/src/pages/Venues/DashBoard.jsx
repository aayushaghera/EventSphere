import React from 'react';
import {
    Calendar,
    DollarSign,
    TrendingUp,
    Star,
    ArrowUp,
    Users,
    MessageSquare,
    CheckCircle,
    Building2
} from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change, color, bgColor }) => (
    <div className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${bgColor}`}>
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                {change}
            </div>
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
    </div>
);


const DashBoard = () => {

    const upcomingBookings = [
        { id: 1, title: 'Marketing Workshop', venue: 'Sunset Outdoor Arena', date: 'Sep 20, 2025', status: 'Pending' },
        { id: 2, title: 'Product Launch', venue: 'Grand Conference Hall', date: 'Sep 20, 2025', status: 'Confirmed' },
        { id: 3, title: 'Annual Tech Summit', venue: 'Grand Conference Hall', date: 'Sep 22, 2025', status: 'Confirmed' },
    ];

    const recentActivity = [
        { id: 1, text: 'New booking confirmed for Sunset Arena.', time: '2m ago', icon: CheckCircle, color: 'text-green-500' },
        { id: 2, text: 'New message from Sarah Johnson.', time: '15m ago', icon: MessageSquare, color: 'text-blue-500' },
        { id: 3, text: 'Client "TechCorp" rated their experience 5 stars.', time: '1h ago', icon: Star, color: 'text-yellow-500' },
    ];
    
    const monthlyRevenue = [
        { name: 'Jun', revenue: 67000 },
        { name: 'Jul', revenue: 72000 },
        { name: 'Aug', revenue: 68000 },
        { name: 'Sep', revenue: 71000 },
    ];
    
    const maxRevenue = Math.max(...monthlyRevenue.map(d => d.revenue));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back, John!</h1>
                <p className="text-gray-600 mt-2">Here's a snapshot of your venue performance for today, September 20, 2025.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={DollarSign} title="Today's Revenue" value="$3,550" change="+20%" color="from-green-500 to-emerald-500" bgColor="from-green-50 to-emerald-50" />
                <StatCard icon={Calendar} title="Today's Bookings" value="4" change="+2" color="from-yellow-500 to-orange-500" bgColor="from-yellow-50 to-orange-50" />
                <StatCard icon={Users} title="Upcoming Check-ins" value="8" change="+5%" color="from-blue-500 to-cyan-500" bgColor="from-blue-50 to-cyan-50" />
                <StatCard icon={Star} title="New Reviews" value="3" change="+1" color="from-purple-500 to-pink-500" bgColor="from-purple-50 to-pink-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Monthly Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Snapshot</h3>
                     <div className="flex justify-between items-end h-64 space-x-4">
                        {monthlyRevenue.map(item => {
                            const barHeight = (item.revenue / maxRevenue) * 100;
                            return (
                                <div key={item.name} className="flex-1 flex flex-col items-center justify-end">
                                    <div className="text-sm font-bold text-gray-700">${(item.revenue / 1000).toFixed(0)}k</div>
                                    <div 
                                      className="w-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-t-lg transition-all duration-500"
                                      style={{ height: `${barHeight}%` }}
                                    ></div>
                                    <div className="mt-2 text-sm font-medium text-gray-500">{item.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h3>
                    <div className="space-y-4">
                        {upcomingBookings.map(booking => (
                            <div key={booking.id} className="flex items-center space-x-4">
                                <div className="p-3 bg-yellow-100 rounded-xl">
                                    <Calendar className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{booking.title}</p>
                                    <p className="text-sm text-gray-500">{booking.venue} - {booking.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
             <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map(activity => {
                        const Icon = activity.icon;
                        return (
                             <div key={activity.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Icon className={`w-5 h-5 ${activity.color}`} />
                                    <p className="text-sm text-gray-700">{activity.text}</p>
                                </div>
                                <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
