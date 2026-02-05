import React, { useState, useEffect, useRef } from 'react';
import { Search, QrCode, User, Clock, Check, X, AlertTriangle, Printer, Users, Mail, Phone, Badge, Filter, Download, RefreshCw } from 'lucide-react';

const CheckInPage = () => {
  const [activeTab, setActiveTab] = useState('checkin');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('tech-conf-2025');
  const [scannerActive, setScannerActive] = useState(false);
  const [checkinStats, setCheckinStats] = useState({
    totalAttendees: 1247,
    checkedIn: 892,
    vipAttendees: 156,
    pendingCheckin: 355
  });
  const [attendees, setAttendees] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [realTimeCount, setRealTimeCount] = useState(0);

  // Sample attendee data
  const sampleAttendees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0101',
      ticketType: 'VIP Pass',
      ticketNumber: 'TK-001-VIP',
      checkedIn: true,
      checkinTime: '2025-09-20T09:15:00Z',
      specialRequirements: ['Vegetarian Meal', 'Wheelchair Access'],
      emergencyContact: 'Jane Doe - +1-555-0102',
      companyOrg: 'TechCorp Inc.',
      badgePrinted: true,
      sessions: ['Opening Keynote', 'AI Workshop']
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-555-0201',
      ticketType: 'General Admission',
      ticketNumber: 'TK-002-GA',
      checkedIn: false,
      checkinTime: null,
      specialRequirements: ['Halal Meal'],
      emergencyContact: 'Mike Johnson - +1-555-0202',
      companyOrg: 'StartupXYZ',
      badgePrinted: false,
      sessions: []
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'mchen@techstart.com',
      phone: '+1-555-0301',
      ticketType: 'Student Discount',
      ticketNumber: 'TK-003-STU',
      checkedIn: true,
      checkinTime: '2025-09-20T08:45:00Z',
      specialRequirements: [],
      emergencyContact: 'Lisa Chen - +1-555-0302',
      companyOrg: 'Stanford University',
      badgePrinted: true,
      sessions: ['Opening Keynote']
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.r@designco.com',
      phone: '+1-555-0401',
      ticketType: 'VIP Pass',
      ticketNumber: 'TK-004-VIP',
      checkedIn: false,
      checkinTime: null,
      specialRequirements: ['Gluten Free Meal', 'Lactose Free'],
      emergencyContact: 'Carlos Rodriguez - +1-555-0402',
      companyOrg: 'DesignCo Studios',
      badgePrinted: false,
      sessions: []
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@innovate.io',
      phone: '+1-555-0501',
      ticketType: 'General Admission',
      ticketNumber: 'TK-005-GA',
      checkedIn: true,
      checkinTime: '2025-09-20T10:30:00Z',
      specialRequirements: [],
      emergencyContact: 'Jenny Kim - +1-555-0502',
      companyOrg: 'InnovateLab',
      badgePrinted: true,
      sessions: ['AI Workshop', 'Networking Session']
    }
  ];

  useEffect(() => {
    setAttendees(sampleAttendees);
    setFilteredAttendees(sampleAttendees);
    
    // Update real-time count
    const checkedInCount = sampleAttendees.filter(a => a.checkedIn).length;
    setRealTimeCount(checkedInCount);
  }, []);

  useEffect(() => {
    let filtered = attendees;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(attendee => 
        attendee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(attendee => {
        switch (filterStatus) {
          case 'checked-in':
            return attendee.checkedIn;
          case 'not-checked-in':
            return !attendee.checkedIn;
          case 'vip':
            return attendee.ticketType.includes('VIP');
          case 'special-needs':
            return attendee.specialRequirements.length > 0;
          default:
            return true;
        }
      });
    }
    
    setFilteredAttendees(filtered);
  }, [searchTerm, filterStatus, attendees]);

  const handleCheckIn = (attendeeId) => {
    setAttendees(prev => prev.map(attendee => 
      attendee.id === attendeeId 
        ? { ...attendee, checkedIn: true, checkinTime: new Date().toISOString() }
        : attendee
    ));
    setRealTimeCount(prev => prev + 1);
  };

  const handleCheckOut = (attendeeId) => {
    setAttendees(prev => prev.map(attendee => 
      attendee.id === attendeeId 
        ? { ...attendee, checkedIn: false, checkinTime: null }
        : attendee
    ));
    setRealTimeCount(prev => prev - 1);
  };

  const handlePrintBadge = (attendeeId) => {
    setAttendees(prev => prev.map(attendee => 
      attendee.id === attendeeId 
        ? { ...attendee, badgePrinted: true }
        : attendee
    ));
    alert('Badge sent to printer!');
  };

  const CheckInInterface = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">{checkinStats.totalAttendees}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Checked In</p>
              <p className="text-2xl font-bold text-green-600">{realTimeCount}</p>
            </div>
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">VIP Attendees</p>
              <p className="text-2xl font-bold text-blue-600">{checkinStats.vipAttendees}</p>
            </div>
            <Badge className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Check-in</p>
              <p className="text-2xl font-bold text-orange-600">{checkinStats.totalAttendees - realTimeCount}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Quick Check-in Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Quick Check-in</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Code Scanner */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <QrCode size={20} />
              QR Code Scanner
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {scannerActive ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <QrCode size={32} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600">Scanner Active - Point camera at QR code</p>
                  <button 
                    onClick={() => setScannerActive(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Stop Scanner
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <QrCode size={48} className="mx-auto text-gray-400" />
                  <p className="text-gray-600">Click to activate QR code scanner</p>
                  <button 
                    onClick={() => setScannerActive(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Start Scanner
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Manual Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Search size={20} />
              Manual Search
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Search by name, email, or ticket number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Attendees</option>
                <option value="checked-in">Checked In</option>
                <option value="not-checked-in">Not Checked In</option>
                <option value="vip">VIP Only</option>
                <option value="special-needs">Special Requirements</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Check-ins */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Check-ins</h2>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        
        <div className="space-y-3">
          {attendees
            .filter(a => a.checkedIn)
            .slice(0, 5)
            .map(attendee => (
            <div key={attendee.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="font-medium">{attendee.firstName} {attendee.lastName}</div>
                  <div className="text-sm text-gray-600">{attendee.ticketType}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(attendee.checkinTime).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AttendeeManagement = () => (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="checked-in">Checked In</option>
              <option value="not-checked-in">Not Checked In</option>
              <option value="vip">VIP Only</option>
              <option value="special-needs">Special Requirements</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Attendee List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Attendee List ({filteredAttendees.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Special Requirements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendees.map((attendee) => (
                <tr key={attendee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {attendee.firstName} {attendee.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{attendee.email}</div>
                        <div className="text-xs text-gray-400">{attendee.ticketNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      attendee.ticketType.includes('VIP') 
                        ? 'bg-blue-100 text-blue-800'
                        : attendee.ticketType.includes('Student')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {attendee.ticketType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {attendee.checkedIn ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <Check size={12} className="mr-1" />
                          Checked In
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                          <Clock size={12} className="mr-1" />
                          Not Checked In
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attendee.checkinTime 
                      ? new Date(attendee.checkinTime).toLocaleString()
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {attendee.specialRequirements.length > 0 ? (
                        <div className="space-y-1">
                          {attendee.specialRequirements.map((req, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mr-1"
                            >
                              <AlertTriangle size={10} className="mr-1" />
                              {req}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {!attendee.checkedIn ? (
                        <button
                          onClick={() => handleCheckIn(attendee.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Check In
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCheckOut(attendee.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                        >
                          Check Out
                        </button>
                      )}
                      
                      <button
                        onClick={() => handlePrintBadge(attendee.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 flex items-center gap-1"
                        disabled={attendee.badgePrinted}
                      >
                        <Printer size={10} />
                        {attendee.badgePrinted ? 'Printed' : 'Print Badge'}
                      </button>
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

  const CommunicationTools = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Mass Communication</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Communication */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Mail size={20} />
              Email Campaign
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Group</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Attendees</option>
                  <option>Checked In Only</option>
                  <option>Not Checked In</option>
                  <option>VIP Attendees</option>
                  <option>Special Requirements</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input 
                  type="text"
                  placeholder="Email subject..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Email message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Send Email
              </button>
            </div>
          </div>

          {/* SMS Communication */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Phone size={20} />
              SMS Campaign
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Group</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Attendees</option>
                  <option>Checked In Only</option>
                  <option>Not Checked In</option>
                  <option>VIP Attendees</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message (160 chars max)</label>
                <textarea 
                  rows={3}
                  maxLength={160}
                  placeholder="SMS message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 text-right">0/160 characters</div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Send SMS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emergency Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Special Requirements</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendees.slice(0, 10).map((attendee) => (
                <tr key={attendee.id}>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium">{attendee.firstName} {attendee.lastName}</div>
                    <div className="text-sm text-gray-500">{attendee.email}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{attendee.emergencyContact}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {attendee.specialRequirements.length > 0 
                        ? attendee.specialRequirements.join(', ')
                        : 'None'
                      }
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Check-in & Attendee Management</h1>
          
          {/* Event Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium text-gray-700">Event:</label>
            <select 
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="tech-conf-2025">Tech Conference 2025</option>
              <option value="design-summit-2025">Design Summit 2025</option>
              <option value="startup-expo-2025">Startup Expo 2025</option>
            </select>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('checkin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'checkin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Digital Check-in
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'management'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Attendee Management
            </button>
            <button
              onClick={() => setActiveTab('communication')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'communication'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Communication
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'checkin' && <CheckInInterface />}
        {activeTab === 'management' && <AttendeeManagement />}
        {activeTab === 'communication' && <CommunicationTools />}
      </div>
    </div>
  );
};

export default CheckInPage;