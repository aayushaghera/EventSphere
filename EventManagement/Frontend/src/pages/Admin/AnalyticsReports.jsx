// src/pages/Admin/AnalyticsReports.jsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, Download, Filter, Eye } from 'lucide-react';

const AnalyticsReports = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // JSON data for user growth - API ready
  const userGrowthData = [
    { month: 'Jan', users: 120, newUsers: 45, activeUsers: 98 },
    { month: 'Feb', users: 180, newUsers: 60, activeUsers: 145 },
    { month: 'Mar', users: 250, newUsers: 70, activeUsers: 198 },
    { month: 'Apr', users: 340, newUsers: 90, activeUsers: 267 },
    { month: 'May', users: 420, newUsers: 80, activeUsers: 334 },
    { month: 'Jun', users: 520, newUsers: 100, activeUsers: 412 },
    { month: 'Jul', users: 640, newUsers: 120, activeUsers: 502 },
    { month: 'Aug', users: 780, newUsers: 140, activeUsers: 618 },
    { month: 'Sep', users: 950, newUsers: 170, activeUsers: 751 },
    { month: 'Oct', users: 1150, newUsers: 200, activeUsers: 912 },
    { month: 'Nov', users: 1380, newUsers: 230, activeUsers: 1096 },
    { month: 'Dec', users: 1650, newUsers: 270, activeUsers: 1312 }
  ];

  // JSON data for revenue trends - API ready
  const revenueData = [
    { month: 'Jan', revenue: 8500, transactions: 145, avgTicket: 58 },
    { month: 'Feb', revenue: 12300, transactions: 198, avgTicket: 62 },
    { month: 'Mar', revenue: 15800, transactions: 234, avgTicket: 67 },
    { month: 'Apr', revenue: 18900, transactions: 287, avgTicket: 66 },
    { month: 'May', revenue: 22100, transactions: 324, avgTicket: 68 },
    { month: 'Jun', revenue: 25600, transactions: 378, avgTicket: 68 },
    { month: 'Jul', revenue: 28900, transactions: 412, avgTicket: 70 },
    { month: 'Aug', revenue: 32400, transactions: 456, avgTicket: 71 },
    { month: 'Sep', revenue: 36800, transactions: 512, avgTicket: 72 },
    { month: 'Oct', revenue: 41200, transactions: 567, avgTicket: 73 },
    { month: 'Nov', revenue: 45900, transactions: 634, avgTicket: 72 },
    { month: 'Dec', revenue: 52300, transactions: 712, avgTicket: 73 }
  ];

  // JSON data for event categories - API ready
  const eventCategoriesData = [
    { name: 'Technology', value: 28, count: 142, color: '#3B82F6' },
    { name: 'Music', value: 22, count: 112, color: '#10B981' },
    { name: 'Business', value: 18, count: 91, color: '#F59E0B' },
    { name: 'Sports', value: 15, count: 76, color: '#EF4444' },
    { name: 'Education', value: 10, count: 51, color: '#8B5CF6' },
    { name: 'Art & Culture', value: 7, count: 35, color: '#EC4899' }
  ];

  // JSON data for platform metrics - API ready
  const platformMetrics = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$52,300',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 2,
      title: 'Active Users',
      value: '1,312',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 3,
      title: 'Total Events',
      value: '507',
      change: '+15.8%',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 4,
      title: 'Conversion Rate',
      value: '73.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-600'
    }
  ];

  // Time range options
  const timeRanges = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  // Handle export functionality
  const handleExportReport = () => {
    // Here you would implement actual export functionality
    console.log('Exporting analytics report...');
    alert('Analytics report exported successfully!');
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${typeof entry.value === 'number' && entry.dataKey.includes('revenue') ? '$' : ''}${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Metric card component
  const MetricCard = ({ metric }) => {
    const Icon = metric.icon;
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{metric.title}</p>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className={metric.color} />
              <span className={`text-sm font-medium ml-1 ${metric.color}`}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className={`p-3 rounded-full bg-gray-50`}>
            <Icon className={`w-6 h-6 ${metric.color}`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Analytics & Reports</h1>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          
          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platformMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">User Growth</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye size={16} />
              <span>Monthly Active Users</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorUsers)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trends Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Trends</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <DollarSign size={16} />
              <span>Monthly Revenue</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Categories Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Categories Distribution</h2>
          <div className="flex flex-col lg:flex-row items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={eventCategoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {eventCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="lg:ml-4 mt-4 lg:mt-0">
              {eventCategoriesData.map((category, index) => (
                <div key={index} className="flex items-center justify-between py-1 min-w-0 lg:min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {category.value}% ({category.count})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Volume</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="transactions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;