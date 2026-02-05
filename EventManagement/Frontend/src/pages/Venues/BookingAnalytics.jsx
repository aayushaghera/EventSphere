import React, { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar,
    Users,
    Star,
    ArrowUp,
    ArrowDown,
    Filter,
    Download,
    RefreshCw,
    PieChart,
    Activity,
    Target,
    Award,
    Clock,
    Building2
} from 'lucide-react';

const BookingAnalytics = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const [selectedMetric, setSelectedMetric] = useState('revenue');

    // Updated analyticsCards with the new theme
    const analyticsCards = [
        {
            title: 'Total Revenue',
            value: '$84,320',
            change: '+18.2%',
            changeType: 'increase',
            period: 'vs last month',
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50'
        },
        {
            title: 'Total Bookings',
            value: '247',
            change: '+23.1%',
            changeType: 'increase',
            period: 'vs last month',
            icon: Calendar,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'from-yellow-50 to-orange-50'
        },
        {
            title: 'Avg Booking Value',
            value: '$341',
            change: '-5.2%',
            changeType: 'decrease',
            period: 'vs last month',
            icon: Target,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-50 to-pink-50'
        },
        {
            title: 'Customer Satisfaction',
            value: '4.8/5.0',
            change: '+0.3',
            changeType: 'increase',
            period: 'vs last month',
            icon: Star,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'from-yellow-50 to-orange-50'
        }
    ];

    const revenueData = [
        { month: 'Jul', revenue: 72000, bookings: 145, occupancy: 89 },
        { month: 'Aug', revenue: 68000, bookings: 132, occupancy: 84 },
        { month: 'Sep', revenue: 71000, bookings: 139, occupancy: 87 },
        { month: 'Oct', revenue: 76000, bookings: 152, occupancy: 91 },
        { month: 'Nov', revenue: 82000, bookings: 165, occupancy: 93 },
        { month: 'Dec', revenue: 84000, bookings: 168, occupancy: 95 }
    ];

    const venuePerformance = [
        { name: 'Grand Conference Hall', bookings: 89, revenue: 31500, occupancy: 94, rating: 4.9, change: '+15%', color: 'yellow' },
        { name: 'Sunset Outdoor Arena', bookings: 67, revenue: 28200, occupancy: 87, rating: 4.7, change: '+22%', color: 'orange' },
        { name: 'Corporate Training Center', bookings: 58, revenue: 18400, occupancy: 81, rating: 4.8, change: '+8%', color: 'yellow' },
        { name: 'Executive Boardroom', bookings: 33, revenue: 6220, occupancy: 68, rating: 4.6, change: '-3%', color: 'orange' }
    ];

    const bookingTypes = [
        { type: 'Corporate Events', percentage: 35, value: 29540, color: 'yellow' },
        { type: 'Weddings', percentage: 28, value: 23630, color: 'orange' },
        { type: 'Conferences', percentage: 22, value: 18580, color: 'yellow' },
        { type: 'Training', percentage: 10, value: 8430, color: 'orange' },
        { type: 'Others', percentage: 5, value: 4220, color: 'yellow' }
    ];

    const getMaxValue = (data, key) => Math.max(...data.map(item => item[key]));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Booking Analytics
                    </h1>
                    <p className="text-gray-600 mt-2">Comprehensive insights into your venue performance.</p>
                </div>
                <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 bg-white  border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                    </select>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {analyticsCards.map((card, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgColor}  shadow-lg hover:shadow-xl transition-all`}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} shadow-lg`}>
                                    <card.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`flex items-center text-sm font-semibold ${card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                    {card.changeType === 'increase' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                                    {card.change}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Trend Chart */}
                <div className="bg-white rounded-2xl shadow-lg  p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
                        </div>
                        <select
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            className="px-3 py-1 text-sm  rounded focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="revenue">Revenue</option>
                            <option value="bookings">Bookings</option>
                            <option value="occupancy">Occupancy</option>
                        </select>
                    </div>
                    <div className="space-y-4">
                        {revenueData.map((item, index) => {
                            const maxValue = getMaxValue(revenueData, selectedMetric);
                            const currentValue = item[selectedMetric];
                            const percentage = (currentValue / maxValue) * 100;
                            return (
                                <div key={index} className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-600 w-8">{item.month}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                                        {selectedMetric === 'revenue' ? `$${currentValue.toLocaleString()}` : `${currentValue}${selectedMetric === 'occupancy' ? '%' : ''}`}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Booking Types Distribution */}
                <div className="bg-white rounded-2xl shadow-lg  p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Booking Distribution</h3>
                        </div>
                        <PieChart className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {bookingTypes.map((type, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 rounded-full bg-${type.color}-500`} />
                                    <span className="text-sm font-medium text-gray-700">{type.type}</span>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">${type.value.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Venue Performance Table */}
            <div className="bg-white rounded-2xl shadow-lg ">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Venue Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Occupancy</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {venuePerformance.map((venue, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 bg-${venue.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                                                <Building2 className={`w-5 h-5 text-${venue.color}-600`} />
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{venue.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venue.bookings}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${venue.revenue.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div className={`bg-${venue.color}-500 h-2 rounded-full`} style={{ width: `${venue.occupancy}%` }} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{venue.occupancy}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`flex items-center text-sm font-medium ${venue.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                            {venue.change.startsWith('+') ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                                            {venue.change}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingAnalytics;
