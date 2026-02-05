import React, { useState } from 'react';
import {
    BarChart3,
    DollarSign,
    Users,
    Target,
    TrendingUp,
    Calendar,
    Download,
    Filter,
    Eye,
    ArrowUp,
    ArrowDown,
    Activity,
    PieChart,
    LineChart,
    Hash
} from 'lucide-react';

const Analytics = ({ events = [], campaigns = [], tickets = [] }) => {
    const [dateRange, setDateRange] = useState('30');
    const [selectedMetric, setSelectedMetric] = useState('revenue');

    // Calculate comprehensive statistics
    const stats = {
        totalEvents: events.length,
        activeEvents: events.filter(e => e.status === 'Active').length,
        totalAttendees: events.reduce((sum, event) => sum + (event.ticketsSold || 0), 0),
        totalRevenue: events.reduce((sum, event) => sum + (event.revenue || 0), 0),
        avgTicketPrice: events.length > 0
            ? events.reduce((sum, event) => sum + (event.revenue || 0), 0) / events.reduce((sum, event) => sum + (event.ticketsSold || 1), 0)
            : 0,
        conversionRate: events.length > 0
            ? (events.reduce((sum, event) => sum + (event.ticketsSold || 0), 0) / events.reduce((sum, event) => sum + (event.totalTickets || 100), 0) * 100)
            : 0,
        attendanceRate: 92, // Mock data
        marketingROI: 340, // Mock data
        activeCampaigns: campaigns.filter(c => c.status === 'Active').length,
        totalCampaignReach: campaigns.reduce((sum, campaign) => sum + (campaign.reach || 0), 0),
        totalCampaignConversions: campaigns.reduce((sum, campaign) => sum + (campaign.conversions || 0), 0)
    };

    // Mock previous period data for comparison
    const previousStats = {
        totalRevenue: stats.totalRevenue * 0.85,
        totalAttendees: stats.totalAttendees * 0.92,
        avgTicketPrice: stats.avgTicketPrice * 0.87,
        conversionRate: stats.conversionRate - 2.3,
        attendanceRate: 87,
        marketingROI: 295
    };

    // Calculate growth percentages
    const growth = {
        revenue: ((stats.totalRevenue - previousStats.totalRevenue) / previousStats.totalRevenue * 100).toFixed(1),
        attendees: ((stats.totalAttendees - previousStats.totalAttendees) / previousStats.totalAttendees * 100).toFixed(1),
        avgPrice: ((stats.avgTicketPrice - previousStats.avgTicketPrice) / previousStats.avgTicketPrice * 100).toFixed(1),
        conversion: (stats.conversionRate - previousStats.conversionRate).toFixed(1),
        attendance: (stats.attendanceRate - previousStats.attendanceRate).toFixed(1),
        roi: (stats.marketingROI - previousStats.marketingROI).toFixed(1)
    };

    // Generate mock revenue data for chart
    const revenueData = [
        { month: 'Jan', value: Math.round(stats.totalRevenue * 0.08) },
        { month: 'Feb', value: Math.round(stats.totalRevenue * 0.06) },
        { month: 'Mar', value: Math.round(stats.totalRevenue * 0.09) },
        { month: 'Apr', value: Math.round(stats.totalRevenue * 0.07) },
        { month: 'May', value: Math.round(stats.totalRevenue * 0.11) },
        { month: 'Jun', value: Math.round(stats.totalRevenue * 0.08) },
        { month: 'Jul', value: Math.round(stats.totalRevenue * 0.10) },
        { month: 'Aug', value: Math.round(stats.totalRevenue * 0.09) },
        { month: 'Sep', value: Math.round(stats.totalRevenue * 0.12) },
        { month: 'Oct', value: Math.round(stats.totalRevenue * 0.08) },
        { month: 'Nov', value: Math.round(stats.totalRevenue * 0.06) },
        { month: 'Dec', value: Math.round(stats.totalRevenue * 0.06) }
    ];

    const maxRevenue = Math.max(...revenueData.map(d => d.value));

    // Top performing events with calculated metrics
    const topEvents = events
        .map(event => ({
            ...event,
            conversionRate: event.totalTickets ? Math.round((event.ticketsSold / event.totalTickets) * 100) : 0,
            revenuePerTicket: event.ticketsSold ? Math.round(event.revenue / event.ticketsSold) : 0
        }))
        .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
        .slice(0, 5);

    const StatCard = ({ title, value, change, icon: Icon, color, prefix = '', suffix = '' }) => {
        const isPositive = parseFloat(change) > 0;
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                        </p>
                        <p className={`text-sm flex items-center gap-1 mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                            {Math.abs(change)}% from last month
                        </p>
                    </div>
                    <Icon className={`w-8 h-8 ${color}`} />
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Analytics & Reports</h2>
                    <p className="text-gray-600 mt-1">Track your event performance and business metrics</p>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 3 months</option>
                        <option value="365">Last year</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={stats.totalRevenue}
                    change={growth.revenue}
                    icon={DollarSign}
                    color="text-green-600"
                    prefix="$"
                />
                <StatCard
                    title="Total Attendees"
                    value={stats.totalAttendees}
                    change={growth.attendees}
                    icon={Users}
                    color="text-green-600"
                />
                <StatCard
                    title="Avg Ticket Price"
                    value={Math.round(stats.avgTicketPrice)}
                    change={growth.avgPrice}
                    icon={BarChart3}
                    color="text-purple-600"
                    prefix="$"
                />
                <StatCard
                    title="Conversion Rate"
                    value={stats.conversionRate.toFixed(1)}
                    change={growth.conversion}
                    icon={Target}
                    color="text-orange-600"
                    suffix="%"
                />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Event Attendance Rate"
                    value={stats.attendanceRate}
                    change={growth.attendance}
                    icon={Activity}
                    color="text-indigo-600"
                    suffix="%"
                />
                <StatCard
                    title="Marketing ROI"
                    value={stats.marketingROI}
                    change={growth.roi}
                    icon={TrendingUp}
                    color="text-pink-600"
                    suffix="%"
                />
                <StatCard
                    title="Active Campaigns"
                    value={stats.activeCampaigns}
                    change="15.2"
                    icon={Hash}
                    color="text-yellow-600"
                />
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-semibold">Revenue Trends</h3>
                        <p className="text-sm text-gray-600 mt-1">Monthly revenue performance over the last year</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedMetric('revenue')}
                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedMetric === 'revenue' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Revenue
                        </button>
                        <button
                            onClick={() => setSelectedMetric('attendees')}
                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedMetric === 'attendees' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Attendees
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="h-64 flex items-end justify-between space-x-2">
                        {revenueData.map((data, index) => {
                            const height = maxRevenue > 0 ? (data.value / maxRevenue) * 100 : 0;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-green-600 rounded-t hover:bg-green-700 transition-colors cursor-pointer relative group"
                                        style={{ height: `${Math.max(height, 5)}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            ${data.value.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-4 text-sm text-gray-600">
                        {revenueData.map((data, index) => (
                            <span key={index} className="text-center flex-1">{data.month}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Events */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-semibold">Top Performing Events</h3>
                        <p className="text-sm text-gray-600 mt-1">Events ranked by revenue performance</p>
                    </div>
                    <div className="p-6">
                        {topEvents.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No events available for analysis.</p>
                                <p className="text-sm">Create events to see performance metrics here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {topEvents.map((event, index) => (
                                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                                                #{index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                    <span>{event.category}</span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {event.startDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{event.ticketsSold || 0}</p>
                                                <p className="text-gray-600">Tickets Sold</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">${(event.revenue || 0).toLocaleString()}</p>
                                                <p className="text-gray-600">Revenue</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{event.conversionRate}%</p>
                                                <p className="text-gray-600">Sold Out</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">${event.revenuePerTicket || 0}</p>
                                                <p className="text-gray-600">Avg Price</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Campaign Performance */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-semibold">Campaign Performance</h3>
                        <p className="text-sm text-gray-600 mt-1">Marketing campaign metrics and ROI</p>
                    </div>
                    <div className="p-6">
                        {campaigns.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No campaigns available for analysis.</p>
                                <p className="text-sm">Create marketing campaigns to track performance.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {campaigns.slice(0, 5).map(campaign => (
                                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                                <span>{campaign.type}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                        campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{(campaign.reach || 0).toLocaleString()}</p>
                                                <p className="text-gray-600">Reach</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{campaign.conversions || 0}</p>
                                                <p className="text-gray-600">Conversions</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">
                                                    {campaign.reach ? Math.round((campaign.conversions / campaign.reach) * 100) : 0}%
                                                </p>
                                                <p className="text-gray-600">CTR</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Event Categories Performance */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold">Event Categories Performance</h3>
                    <p className="text-sm text-gray-600 mt-1">Revenue and attendance by event category</p>
                </div>
                <div className="p-6">
                    {events.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <PieChart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No event data available for category analysis.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from(new Set(events.map(e => e.category))).map(category => {
                                const categoryEvents = events.filter(e => e.category === category);
                                const categoryRevenue = categoryEvents.reduce((sum, e) => sum + (e.revenue || 0), 0);
                                const categoryAttendees = categoryEvents.reduce((sum, e) => sum + (e.ticketsSold || 0), 0);
                                const revenuePercentage = stats.totalRevenue > 0 ? (categoryRevenue / stats.totalRevenue * 100) : 0;

                                return (
                                    <div key={category} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-gray-900">{category}</h4>
                                            <span className="text-sm text-gray-600">{categoryEvents.length} events</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Revenue:</span>
                                                <span className="font-semibold">${categoryRevenue.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Attendees:</span>
                                                <span className="font-semibold">{categoryAttendees.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                                <div
                                                    className="bg-green-600 h-2.5 rounded-full"
                                                    style={{ width: `${revenuePercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;