import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, X, User, Shield, Building2, MapPin, Users, DollarSign } from 'lucide-react';
import { sidebarItems } from './constants'; 

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const [activeTheme, setActiveTheme] = useState('from-yellow-500 to-orange-500');
  const [activePrimaryColor, setActivePrimaryColor] = useState('text-blue-500');
  
  // Add Venue Modal State
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const [newVenue, setNewVenue] = useState({
    name: '',
    type: 'Conference Hall',
    address: '',
    city: '',
    state: '',
    capacity: '',
    hourlyRate: '',
    facilities: [],
    contactPerson: '',
    description: ''
  });

  // Available facility options
  const facilityOptions = [
    'WiFi',
    'Parking',
    'Air Conditioning',
    'Sound System',
    'Projector',
    'Stage',
    'Catering Kitchen',
    'Green Room',
    'Security',
    'Elevator Access',
    'Wheelchair Accessible',
    'Outdoor Space'
  ];

  // Handle facility toggle
  const toggleFacility = (facility) => {
    setNewVenue(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  // Handle form submission
  const handleAddVenue = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newVenue.name.trim() || newVenue.name.length < 3 || newVenue.name.length > 200) {
      alert('Venue name must be between 3 and 200 characters');
      return;
    }
    
    if (!newVenue.capacity || newVenue.capacity < 1) {
      alert('Please enter a valid capacity');
      return;
    }
    
    if (!newVenue.hourlyRate || newVenue.hourlyRate < 0) {
      alert('Please enter a valid hourly rate');
      return;
    }

    // Here you would typically send the data to your backend API
    // For now, we'll just log it and show a success message
    console.log('New Venue Data:', newVenue);
    
    // Show success message (you might want to replace this with a proper toast notification)
    alert('Venue added successfully!');
    
    // Reset form and close modal
    setNewVenue({
      name: '',
      type: 'Conference Hall',
      address: '',
      city: '',
      state: '',
      capacity: '',
      hourlyRate: '',
      facilities: [],
      contactPerson: '',
      description: ''
    });
    setShowAddVenueModal(false);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowAddVenueModal(false);
    // Reset form when closing
    setNewVenue({
      name: '',
      type: 'Conference Hall',
      address: '',
      city: '',
      state: '',
      capacity: '',
      hourlyRate: '',
      facilities: [],
      contactPerson: '',
      description: ''
    });
  };

  // Add New Venue Modal Component
  const AddVenueModal = () => {
    if (!showAddVenueModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Venue</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddVenue} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newVenue.name}
                      onChange={(e) => setNewVenue({...newVenue, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter venue name (3-200 chars)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue Type *
                    </label>
                    <select
                      required
                      value={newVenue.type}
                      onChange={(e) => setNewVenue({...newVenue, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="Conference Hall">Conference Hall</option>
                      <option value="Auditorium">Auditorium</option>
                      <option value="Stadium">Stadium</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Banquet Hall">Banquet Hall</option>
                      <option value="Theater">Theater</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={newVenue.description}
                    onChange={(e) => setNewVenue({...newVenue, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Brief description of the venue..."
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Location Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={newVenue.address}
                    onChange={(e) => setNewVenue({...newVenue, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Full street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={newVenue.city}
                      onChange={(e) => setNewVenue({...newVenue, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="City name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={newVenue.state}
                      onChange={(e) => setNewVenue({...newVenue, state: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="State name"
                    />
                  </div>
                </div>
              </div>

              {/* Venue Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Venue Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Capacity *
                    </label>
                    <div className="relative">
                      <Users className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="1"
                        value={newVenue.capacity}
                        onChange={(e) => setNewVenue({...newVenue, capacity: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Maximum attendees"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate ($) *
                    </label>
                    <div className="relative">
                      <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={newVenue.hourlyRate}
                        onChange={(e) => setNewVenue({...newVenue, hourlyRate: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Rental cost per hour"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={newVenue.contactPerson}
                    onChange={(e) => setNewVenue({...newVenue, contactPerson: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Venue manager name and contact details"
                  />
                </div>
              </div>

              {/* Available Facilities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Available Facilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {facilityOptions.map((facility) => (
                    <label key={facility} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={newVenue.facilities.includes(facility)}
                        onChange={() => toggleFacility(facility)}
                        className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-700">{facility}</span>
                    </label>
                  ))}
                </div>
                {newVenue.facilities.length > 0 && (
                  <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Selected facilities:</span> {newVenue.facilities.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Add Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Overlay for mobile view */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col`}>
        
        <div className="hidden lg:flex items-center space-x-3 p-4 h-16 border-b border-gray-200/50">
            <div className={`w-10 h-10 bg-gradient-to-r ${activeTheme} rounded-xl flex items-center justify-center shadow-lg transition-colors`}>
                <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    VenueHub Pro
                </h1>
            </div>
        </div>

        {/* Mobile Header (hidden on desktop) */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
               <Building2 className="w-5 h-5 text-white" />
             </div>
             <h2 className="text-lg font-bold text-gray-900">VenueHub Pro</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Add New Venue Button */}
        <div className="p-4">
          <button 
            onClick={() => setShowAddVenueModal(true)}
            className={`w-full bg-gradient-to-r ${activeTheme} text-white rounded-xl py-3 font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2`}
          >
            <Plus className="w-5 h-5" />
            <span>Add New Venue</span>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 pb-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname.includes(item.id);
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose} // Close sidebar on mobile after navigation
                className={`block group relative rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-4 p-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-800'}`} />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Add Venue Modal */}
      <AddVenueModal />
    </>
  );
};

export default Sidebar;