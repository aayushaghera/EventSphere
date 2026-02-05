import React, { useState, useRef, useEffect } from 'react';
import {
    Settings,
    Wrench,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    Plus,
    Filter,
    Search,
    User,
    Phone,
    DollarSign,
    Activity,
    MoreHorizontal,
    X,
    Target,
    ChevronLeft,
    Trash2,
    Edit,
    ParkingCircle,
    AirVent,
    Wifi,
    Projector,
    Video,
    Lightbulb,
    Clipboard,
    MapPin,
    Image as ImageIcon,
    FileText,
    ChevronRight,
    Users,
    Building,
    MapIcon
} from 'lucide-react';

const FacilityManagement = () => {
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [detailedVenue, setDetailedVenue] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const initialVenues = [
        { 
            id: 1, 
            name: 'Grand Conference Hall',
            type: 'Conference Hall',
            description: 'Our largest and most versatile space, perfect for conferences, galas, and large-scale events. Features state-of-the-art audiovisual equipment and flexible seating arrangements.',
            completeAddress: '123 Main Street, Downtown',
            city: 'Metropolis',
            state: 'NY',
            maxCapacity: 500,
            hourlyRate: 250,
            contactPerson: 'John Smith',
            availableFacilities: ['WiFi', 'Parking', 'Air Conditioning', 'Sound System', 'Projector', 'Stage'],
            photos: [
                'https://placehold.co/800x600/f97316/white?text=Main+Hall',
                'https://placehold.co/800x600/fb923c/white?text=Stage+View',
                'https://placehold.co/800x600/fdba74/white?text=Lobby',
            ]
        },
        { 
            id: 2, 
            name: 'Executive Boardroom',
            type: 'Conference Hall',
            description: 'An intimate and professional setting for high-level meetings and presentations. Equipped with the latest video conferencing technology.',
            completeAddress: '456 Oak Avenue, Business District',
            city: 'Metropolis',
            state: 'NY',
            maxCapacity: 25,
            hourlyRate: 75,
            contactPerson: 'Sarah Johnson',
            availableFacilities: ['WiFi', 'Air Conditioning', 'Sound System', 'Projector'],
            photos: [
                'https://placehold.co/800x600/3b82f6/white?text=Boardroom',
                'https://placehold.co/800x600/60a5fa/white?text=Meeting+Table',
            ]
        },
        { 
            id: 3, 
            name: 'Sunset Outdoor Arena',
            type: 'Outdoor',
            description: 'A breathtaking open-air venue with stunning sunset views, ideal for concerts, festivals, and large outdoor gatherings.',
            completeAddress: '789 Scenic Drive, Hilltop Park',
            city: 'Metropolis',
            state: 'NY',
            maxCapacity: 2000,
            hourlyRate: 500,
            contactPerson: 'Mike Davis',
            availableFacilities: ['Parking', 'Sound System', 'Stage', 'Security', 'Outdoor Space'],
            photos: [
                'https://placehold.co/800x600/8b5cf6/white?text=Arena+Stage',
            ]
        },
        { 
            id: 4, 
            name: 'Corporate Training Center',
            type: 'Conference Hall',
            description: 'A dedicated facility for workshops, seminars, and corporate training. Multiple configurable rooms to suit your needs.',
            completeAddress: '101 Learning Lane, Tech Campus',
            city: 'Metropolis',
            state: 'NY',
            maxCapacity: 150,
            hourlyRate: 120,
            contactPerson: 'Lisa Wong',
            availableFacilities: ['WiFi', 'Air Conditioning', 'Projector', 'Catering Kitchen', 'Elevator Access'],
            photos: [
                'https://placehold.co/800x600/10b981/white?text=Training+Room+A',
                'https://placehold.co/800x600/34d399/white?text=Breakout+Area',
            ]
        },
    ];

    const [allVenues, setAllVenues] = useState(initialVenues);

    const [editingSection, setEditingSection] = useState(null);
    const [venueToEdit, setVenueToEdit] = useState(null);
    const [sectionFormData, setSectionFormData] = useState({});

    const [showDeleteVenueModal, setShowDeleteVenueModal] = useState(false);
    const [deletingVenue, setDeletingVenue] = useState(null);

    const [openVenueMenuId, setOpenVenueMenuId] = useState(null);
    const menuRef = useRef(null);

    const VENUE_TYPES = ['Conference Hall', 'Auditorium', 'Stadium', 'Outdoor', 'Banquet Hall', 'Theater'];
    
    const AVAILABLE_FACILITIES = [
        'WiFi', 'Parking', 'Air Conditioning', 'Sound System', 'Projector', 'Stage',
        'Catering Kitchen', 'Green Room', 'Security', 'Elevator Access', 
        'Wheelchair Accessible', 'Outdoor Space'
    ];

    const facilityIcons = {
        'WiFi': <Wifi className="w-4 h-4" />,
        'Parking': <ParkingCircle className="w-4 h-4" />,
        'Air Conditioning': <AirVent className="w-4 h-4" />,
        'Sound System': <Activity className="w-4 h-4" />,
        'Projector': <Projector className="w-4 h-4" />,
        'Stage': <Target className="w-4 h-4" />,
        'Catering Kitchen': <Clipboard className="w-4 h-4" />,
        'Green Room': <Building className="w-4 h-4" />,
        'Security': <AlertTriangle className="w-4 h-4" />,
        'Elevator Access': <Activity className="w-4 h-4" />,
        'Wheelchair Accessible': <User className="w-4 h-4" />,
        'Outdoor Space': <MapIcon className="w-4 h-4" />
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenVenueMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleOpenDetailModal = (venue) => {
        setDetailedVenue(venue);
        setCurrentPhotoIndex(0);
    }

    const handleDeleteRequest = (venue) => {
        setDeletingVenue(venue);
        setShowDeleteVenueModal(true);
        setOpenVenueMenuId(null);
    };

    const handleDeleteVenue = () => {
        setAllVenues(allVenues.filter(venue => venue.id !== deletingVenue.id));
        setShowDeleteVenueModal(false);
        setDeletingVenue(null);
    };

    const handleEditSection = (section, venue) => {
        setEditingSection(section);
        setVenueToEdit(venue);
        setSectionFormData({ ...venue });
        setDetailedVenue(null);
    };

    const handleUpdateSection = (e) => {
        e.preventDefault();
        setAllVenues(allVenues.map(v => v.id === venueToEdit.id ? { ...v, ...sectionFormData } : v));
        setEditingSection(null);
        setVenueToEdit(null);
    };
    
    const venuesWithImage = allVenues.map((venue, index) => ({
        ...venue,
        image: venue.photos[0] || `https://placehold.co/600x400/${['f97316', '3b82f6', '8b5cf6', '10b981'][index % 4]}/white?text=${encodeURIComponent(venue.name.replace(/\s/g, '+'))}`,
    }));

    const renderVenueSelection = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Facility Management
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">An interactive dashboard to manage your venues. Hover over a card for a 3D effect and click to see details.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {venuesWithImage.map((venue) => (
                    <div key={venue.id} className="group [perspective:1000px]">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)]">
                            <div className="relative">
                                <img onClick={() => handleOpenDetailModal(venue)} src={venue.image} alt={venue.name} className="w-full h-48 object-cover cursor-pointer" />
                                <div className="absolute top-2 right-2" ref={menuRef}>
                                    <button onClick={() => setOpenVenueMenuId(openVenueMenuId === venue.id ? null : venue.id)} className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-colors">
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </button>
                                    {openVenueMenuId === venue.id && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-20 py-1 border">
                                            <button onClick={() => handleDeleteRequest(venue)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 className="w-4 h-4"/> Delete Venue</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col cursor-pointer" onClick={() => handleOpenDetailModal(venue)}>
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{venue.type}</p>
                                </div>
                                
                                <div className="space-y-3 flex-grow">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">{venue.city}, {venue.state}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">Capacity: {venue.maxCapacity}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">${venue.hourlyRate}/hour</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t">
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Top Facilities</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {venue.availableFacilities.slice(0, 3).map(facility => (
                                            <span key={facility} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                {facilityIcons[facility]} {facility}
                                            </span>
                                        ))}
                                        {venue.availableFacilities.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                +{venue.availableFacilities.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderVenueDetailModal = () => {
        if (!detailedVenue) return null;

        const nextPhoto = () => setCurrentPhotoIndex((prev) => (prev + 1) % detailedVenue.photos.length);
        const prevPhoto = () => setCurrentPhotoIndex((prev) => (prev - 1 + detailedVenue.photos.length) % detailedVenue.photos.length);

        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col">
                    <div className="p-6 flex items-center justify-between border-b">
                         <h2 className="text-2xl font-bold text-gray-900">{detailedVenue.name}</h2>
                         <button onClick={() => setDetailedVenue(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><X className="w-6 h-6" /></button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-6 space-y-6">
                        {/* Photos Section */}
                        <div className="relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                <ImageIcon className="w-5 h-5 mr-2 text-yellow-500"/> Photos
                                <button onClick={() => handleEditSection('photos', detailedVenue)} className="ml-auto p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"><Edit className="w-4 h-4"/></button>
                            </h3>
                            {detailedVenue.photos && detailedVenue.photos.length > 0 ? (
                                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={detailedVenue.photos[currentPhotoIndex]} alt={`${detailedVenue.name} photo ${currentPhotoIndex + 1}`} className="w-full h-full object-cover"/>
                                    <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full backdrop-blur-sm"><ChevronLeft className="w-5 h-5"/></button>
                                    <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full backdrop-blur-sm"><ChevronRight className="w-5 h-5"/></button>
                                </div>
                            ) : <p className="text-sm text-gray-500">No photos available.</p>}
                        </div>

                        {/* Basic Information */}
                        <div className="relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Building className="w-5 h-5 mr-2 text-yellow-500"/> Basic Information
                                <button onClick={() => handleEditSection('basic', detailedVenue)} className="ml-auto p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"><Edit className="w-4 h-4"/></button>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Venue Type</label>
                                    <p className="text-gray-800">{detailedVenue.type}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Contact Person</label>
                                    <p className="text-gray-800">{detailedVenue.contactPerson}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Maximum Capacity</label>
                                    <p className="text-gray-800">{detailedVenue.maxCapacity} people</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Hourly Rate</label>
                                    <p className="text-gray-800">${detailedVenue.hourlyRate}/hour</p>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-yellow-500"/> Description
                                <button onClick={() => handleEditSection('description', detailedVenue)} className="ml-auto p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"><Edit className="w-4 h-4"/></button>
                            </h3>
                            <p className="text-sm text-gray-600">{detailedVenue.description || 'No description provided.'}</p>
                        </div>

                        {/* Location Details */}
                        <div className="relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-yellow-500"/> Location Details
                                <button onClick={() => handleEditSection('location', detailedVenue)} className="ml-auto p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"><Edit className="w-4 h-4"/></button>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Complete Address</label>
                                    <p className="text-gray-800">{detailedVenue.completeAddress}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">City</label>
                                    <p className="text-gray-800">{detailedVenue.city}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">State</label>
                                    <p className="text-gray-800">{detailedVenue.state}</p>
                                </div>
                            </div>
                        </div>

                        {/* Available Facilities */}
                        <div className="relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Settings className="w-5 h-5 mr-2 text-yellow-500"/> Available Facilities
                                <button onClick={() => handleEditSection('facilities', detailedVenue)} className="ml-auto p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"><Edit className="w-4 h-4"/></button>
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {detailedVenue.availableFacilities.map(facility => (
                                    <span key={facility} className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                        {facilityIcons[facility]}
                                        {facility}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    };
    
    const renderEditSectionModal = () => {
        if (!editingSection || !venueToEdit) return null;

        const handlePhotoUrlChange = (index, value) => {
            const newPhotos = [...(sectionFormData.photos || [])];
            newPhotos[index] = value;
            setSectionFormData({...sectionFormData, photos: newPhotos});
        };
        const addPhotoField = () => {
            const newPhotos = [...(sectionFormData.photos || []), ''];
            setSectionFormData({...sectionFormData, photos: newPhotos});
        };
        const removePhotoField = (index) => {
            const newPhotos = (sectionFormData.photos || []).filter((_, i) => i !== index);
            setSectionFormData({...sectionFormData, photos: newPhotos});
        };

        const handleFacilityChange = (facility) => {
            const currentFacilities = sectionFormData.availableFacilities || [];
            const newFacilities = currentFacilities.includes(facility)
                ? currentFacilities.filter(f => f !== facility)
                : [...currentFacilities, facility];
            setSectionFormData({ ...sectionFormData, availableFacilities: newFacilities });
        };
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
                <div className="bg-white rounded-2xl max-w-2xl w-full">
                    <form onSubmit={handleUpdateSection} className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                Edit {editingSection === 'basic' ? 'Basic Information' : 
                                      editingSection === 'facilities' ? 'Available Facilities' :
                                      editingSection === 'location' ? 'Location Details' : editingSection}
                            </h2>
                            <button type="button" onClick={() => setEditingSection(null)} className="p-2 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {editingSection === 'basic' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name *</label>
                                        <input type="text" value={sectionFormData.name || ''} onChange={(e) => setSectionFormData({...sectionFormData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue Type *</label>
                                        <select value={sectionFormData.type || ''} onChange={(e) => setSectionFormData({...sectionFormData, type: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required>
                                            <option value="">Select venue type</option>
                                            {VENUE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Capacity *</label>
                                        <input type="number" value={sectionFormData.maxCapacity || ''} onChange={(e) => setSectionFormData({...sectionFormData, maxCapacity: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($) *</label>
                                        <input type="number" value={sectionFormData.hourlyRate || ''} onChange={(e) => setSectionFormData({...sectionFormData, hourlyRate: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                                        <input type="text" value={sectionFormData.contactPerson || ''} onChange={(e) => setSectionFormData({...sectionFormData, contactPerson: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required />
                                    </div>
                                </div>
                            )}
                            {editingSection === 'description' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea rows={5} value={sectionFormData.description || ''} onChange={(e) => setSectionFormData({...sectionFormData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" />
                                </div>
                            )}
                            {editingSection === 'location' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address *</label>
                                        <input type="text" value={sectionFormData.completeAddress || ''} onChange={(e) => setSectionFormData({...sectionFormData, completeAddress: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                            <input type="text" value={sectionFormData.city || ''} onChange={(e) => setSectionFormData({...sectionFormData, city: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                            <input type="text" value={sectionFormData.state || ''} onChange={(e) => setSectionFormData({...sectionFormData, state: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" required />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {editingSection === 'facilities' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Available Facilities</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {AVAILABLE_FACILITIES.map(facility => (
                                            <label key={facility} className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-gray-50 cursor-pointer">
                                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" checked={(sectionFormData.availableFacilities || []).includes(facility)} onChange={() => handleFacilityChange(facility)} />
                                                <span className="text-sm text-gray-700">{facility}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {editingSection === 'photos' && (
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Photos</label>
                                    {(sectionFormData.photos || []).map((photo, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input type="url" value={photo} onChange={(e) => handlePhotoUrlChange(index, e.target.value)} placeholder="https://example.com/image.png" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" />
                                            <button type="button" onClick={() => removePhotoField(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 className="w-4 h-4"/></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addPhotoField} className="text-sm text-yellow-600 hover:underline">Add Photo URL</button>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
                            <button type="button" onClick={() => setEditingSection(null)} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                            <button type="submit" className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderDeleteVenueModal = () => {
        if (!showDeleteVenueModal || !deletingVenue) return null;
        return (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6">
                    <h2 className="text-xl font-bold text-gray-900">Confirm Deletion</h2>
                    <p className="text-gray-600 mt-2">Are you sure you want to delete <span className="font-semibold">{deletingVenue.name}</span>? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-4 pt-6 mt-4">
                        <button onClick={() => setShowDeleteVenueModal(false)} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button onClick={handleDeleteVenue} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 min-h-screen">
             <div className="max-w-7xl mx-auto">
                {renderVenueSelection()}
                {renderVenueDetailModal()}
                {renderEditSectionModal()}
                {renderDeleteVenueModal()}
            </div>
        </div>
    );
};

export default FacilityManagement;