// src/pages/Admin/PlatformOverview.jsx
import React from 'react';
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50 flex items-center space-x-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const PlatformOverview = () => {
  // JSON array for stats - easy to connect with API
  const platformStats = [
    {
      id: 1,
      title: "Total Users",
      value: "1,250",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Total Events",
      value: "3,402",
      icon: Calendar,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Total Transactions",
      value: "15,820",
      icon: DollarSign,
      color: "bg-yellow-500"
    },
    {
      id: 4,
      title: "Platform Revenue (Month)",
      value: "$12,300",
      icon: Activity,
      color: "bg-red-500"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Platform Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat) => (
          <StatCard 
            key={stat.id}
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon} 
            color={stat.color} 
          />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        {/* Placeholder for a chart or activity feed */}
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Transaction History Chart</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;1