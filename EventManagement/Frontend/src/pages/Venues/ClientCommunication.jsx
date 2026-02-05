import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send,
  Phone,
  Mail,
  Search,
  Filter,
  Plus,
  Star,
  Clock,
  User,
  Calendar,
  MapPin,
  Paperclip,
  Smile,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Eye,
  Archive,
  Flag,
  Reply,
  Forward,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Heart,
  ThumbsUp
} from 'lucide-react';

const ClientCommunication = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const conversations = [
    {
      id: 1,
      client: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      avatar: 'SJ',
      lastMessage: 'Thank you for the venue tour! We\'d like to book for December 15th.',
      timestamp: '2 min ago',
      unread: 2,
      status: 'active',
      venue: 'Grand Conference Hall',
      bookingValue: 2400,
      priority: 'high',
      tags: ['VIP', 'Corporate']
    },
    {
      id: 2,
      client: 'Michael Chen',
      company: 'Wedding Planners Co.',
      avatar: 'MC',
      lastMessage: 'Can we schedule a call to discuss catering options?',
      timestamp: '1 hour ago',
      unread: 0,
      status: 'pending',
      venue: 'Sunset Outdoor Arena',
      bookingValue: 3500,
      priority: 'medium',
      tags: ['Wedding', 'Premium']
    },
    {
      id: 3,
      client: 'Emily Rodriguez',
      company: 'StartupHub',
      avatar: 'ER',
      lastMessage: 'The networking event was fantastic! Looking forward to our next booking.',
      timestamp: '3 hours ago',
      unread: 0,
      status: 'completed',
      venue: 'Corporate Training Center',
      bookingValue: 1200,
      priority: 'low',
      tags: ['Repeat Client', 'Startup']
    },
    {
      id: 4,
      client: 'David Thompson',
      company: 'Global Industries',
      avatar: 'DT',
      lastMessage: 'We need to discuss some changes to the setup requirements.',
      timestamp: '5 hours ago',
      unread: 1,
      status: 'active',
      venue: 'Executive Boardroom',
      bookingValue: 800,
      priority: 'medium',
      tags: ['Corporate', 'Urgent']
    },
    {
      id: 5,
      client: 'Lisa Park',
      company: 'Creative Events',
      avatar: 'LP',
      lastMessage: 'The proposal looks great! When can we sign the contract?',
      timestamp: '1 day ago',
      unread: 0,
      status: 'negotiation',
      venue: 'Grand Conference Hall',
      bookingValue: 4200,
      priority: 'high',
      tags: ['New Client', 'High Value']
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'client',
      content: 'Hi! I\'m interested in booking your Grand Conference Hall for a corporate event.',
      timestamp: '10:30 AM',
      date: 'Today'
    },
    {
      id: 2,
      sender: 'owner',
      content: 'Hello Sarah! Thank you for your interest. I\'d be happy to help you with your corporate event. Could you tell me more about the date, expected number of attendees, and any specific requirements?',
      timestamp: '10:32 AM',
      date: 'Today'
    },
    {
      id: 3,
      sender: 'client',
      content: 'We\'re planning for December 15th, expecting around 400 attendees. We\'ll need A/V equipment, catering space, and parking for about 200 cars.',
      timestamp: '10:35 AM',
      date: 'Today'
    },
    {
      id: 4,
      sender: 'owner',
      content: 'Perfect! The Grand Conference Hall can accommodate 500 people, so 400 is well within capacity. We have full A/V equipment, dedicated catering areas, and parking for 250 cars. Would you like to schedule a venue tour?',
      timestamp: '10:37 AM',
      date: 'Today'
    },
    {
      id: 5,
      sender: 'client',
      content: 'That sounds perfect! Yes, I\'d love to schedule a tour. Are you available tomorrow afternoon?',
      timestamp: '10:40 AM',
      date: 'Today'
    },
    {
      id: 6,
      sender: 'owner',
      content: 'Absolutely! How about 2:00 PM tomorrow? I\'ll show you the main hall, catering facilities, and we can discuss pricing and packages.',
      timestamp: '10:42 AM',
      date: 'Today'
    },
    {
      id: 7,
      sender: 'client',
      content: 'Perfect! See you tomorrow at 2:00 PM. Thank you for the quick response!',
      timestamp: '10:45 AM',
      date: 'Today'
    },
    {
      id: 8,
      sender: 'client',
      content: 'Thank you for the venue tour! We\'d like to book for December 15th.',
      timestamp: '11:58 AM',
      date: 'Today'
    }
  ];

  const clientStats = [
    {
      title: 'Active Conversations',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      title: 'Response Rate',
      value: '98%',
      change: '+2%',
      changeType: 'increase',
      icon: Reply,
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: '8 min',
      change: '-2 min',
      changeType: 'decrease',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Client Satisfaction',
      value: '4.9/5',
      change: '+0.1',
      changeType: 'increase',
      icon: Star,
      color: 'yellow'
    }
  ];

  const quickReplies = [
    "Thank you for your inquiry! I'll get back to you shortly.",
    "I'd be happy to schedule a venue tour for you.",
    "Let me check availability for those dates.",
    "I'll send you a detailed quote within 24 hours.",
    "Would you like to discuss this over a phone call?"
  ];

  const getCurrentConversation = () => {
    return conversations.find(conv => conv.id === selectedConversation);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'negotiation': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredConversations = filterStatus === 'all' 
    ? conversations 
    : conversations.filter(conv => conv.status === filterStatus);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText('');
    }
  };

  const renderConversationList = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="negotiation">Negotiation</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-4">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedConversation === conv.id 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {conv.avatar}
                  </div>
                  {conv.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{conv.client}</h4>
                    <div className="flex items-center space-x-1">
                      <Flag className={`w-3 h-3 ${getPriorityColor(conv.priority)}`} />
                      <span className="text-xs text-gray-500">{conv.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">{conv.company}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{conv.lastMessage}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(conv.status)}`}>
                      {conv.status}
                    </span>
                    <div className="flex items-center space-x-1">
                      {conv.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessageThread = () => {
    const currentConv = getCurrentConversation();
    if (!currentConv) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                {currentConv.avatar}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{currentConv.client}</h3>
                <p className="text-sm text-gray-500">{currentConv.company}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(currentConv.status)}`}>
                    {currentConv.status}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{currentConv.venue}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'owner' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'owner'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'owner' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-6 py-3 border-t border-gray-100">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {quickReplies.slice(0, 3).map((reply, index) => (
              <button
                key={index}
                onClick={() => setMessageText(reply)}
                className="flex-shrink-0 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                {reply.length > 30 ? reply.substring(0, 30) + '...' : reply}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className={`p-3 rounded-xl transition-colors ${
                messageText.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderClientProfiles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Client Profiles</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conversations.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {client.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{client.client}</h4>
                  <p className="text-sm text-gray-500">{client.company}</p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Booking Value:</span>
                <span className="font-semibold text-green-600">${client.bookingValue.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Venue:</span>
                <span className="font-medium text-gray-900">{client.venue}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Priority:</span>
                <Flag className={`w-4 h-4 ${getPriorityColor(client.priority)}`} />
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {client.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                <MessageSquare className="w-3 h-3" />
                Message
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                <Eye className="w-3 h-3" />
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'clients', label: 'Client Profiles', icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Client Communication
          </h1>
          <p className="text-gray-600 mt-2">Manage client relationships and communications effectively</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' && stat.title.includes('Time') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        <div className="p-6">
          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[600px]">
              <div className="lg:col-span-2">
                {renderConversationList()}
              </div>
              <div className="lg:col-span-3">
                {renderMessageThread()}
              </div>
            </div>
          )}
          {activeTab === 'clients' && renderClientProfiles()}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-500">Latest client interactions and updates</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[
            {
              type: 'message',
              client: 'Sarah Johnson',
              action: 'sent a new message',
              time: '5 minutes ago',
              icon: MessageSquare,
              color: 'blue'
            },
            {
              type: 'booking',
              client: 'Michael Chen',
              action: 'confirmed venue booking',
              time: '2 hours ago',
              icon: CheckCircle,
              color: 'green'
            },
            {
              type: 'call',
              client: 'Emily Rodriguez',
              action: 'scheduled a call',
              time: '4 hours ago',
              icon: Phone,
              color: 'purple'
            },
            {
              type: 'review',
              client: 'David Thompson',
              action: 'left a 5-star review',
              time: '1 day ago',
              icon: Star,
              color: 'yellow'
            },
            {
              type: 'payment',
              client: 'Lisa Park',
              action: 'completed payment',
              time: '2 days ago',
              icon: DollarSign,
              color: 'green'
            }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                    <Icon className={`w-5 h-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.client}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Communication Insights */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-indigo-500 rounded-xl mr-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Communication Insights</h3>
            <p className="text-gray-600">Key metrics and recommendations for client engagement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <ThumbsUp className="w-4 h-4 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Response Excellence</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Your average response time of 8 minutes is 40% better than industry standard. Keep up the excellent work!
            </p>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">98% satisfaction rate</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Client Retention</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              85% of your clients return for future bookings. Consider implementing a loyalty program for even better retention.
            </p>
            <div className="flex items-center text-sm">
              <span className="text-blue-600 font-medium">12% above industry average</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Peak Hours</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Most client inquiries come between 10 AM - 2 PM and 6 PM - 8 PM. Consider having dedicated support during these hours.
            </p>
            <div className="flex items-center text-sm">
              <span className="text-purple-600 font-medium">60% of daily messages</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-4 h-4 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Client Satisfaction</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Clients appreciate your quick responses and detailed venue information. Personal touches in communication increase booking rates by 25%.
            </p>
            <div className="flex items-center text-sm">
              <span className="text-orange-600 font-medium">4.9/5 average rating</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Based on analysis of your communication patterns and client feedback over the past 90 days.
              </p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCommunication;