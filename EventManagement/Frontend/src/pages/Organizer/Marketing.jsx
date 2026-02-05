import React, { useState } from 'react';
import {
    Plus,
    Mail,
    Share,
    Tag,
    Target,
    Facebook,
    Twitter,
    Linkedin,
    X,
    Save,
    AlertCircle,
    TrendingUp,
    Users,
    DollarSign,
    Eye,
    Edit,
    Trash2,
    Send,
    Calendar,
    BarChart3,
    MessageSquare
} from 'lucide-react';

const Marketing = () => {
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: "Early Bird Special",
            type: "Discount Campaign",
            description: "Limited time early bird pricing",
            discount: 20,
            promoCode: "EARLY2025",
            startDate: "2024-12-01",
            endDate: "2024-12-31",
            status: "Active",
            reach: 1250,
            conversions: 89,
            revenue: 4450
        },
        {
            id: 2,
            name: "Social Media Blast",
            type: "Social Media",
            description: "Multi-platform event promotion",
            startDate: "2024-11-15",
            endDate: "2025-01-15",
            status: "Active",
            reach: 2800,
            conversions: 156,
            revenue: 7800
        }
    ]);

    const [showCampaignForm, setShowCampaignForm] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);

    const [campaignForm, setCampaignForm] = useState({
        name: '',
        type: '',
        description: '',
        discount: '',
        promoCode: '',
        startDate: '',
        endDate: '',
        targetAudience: 'all'
    });

    const [emailForm, setEmailForm] = useState({
        subject: '',
        message: '',
        targetAudience: 'all',
        template: 'custom'
    });

    const [errors, setErrors] = useState({});

    const campaignTypes = ['Email Marketing', 'Social Media', 'Discount Campaign', 'Affiliate Program'];
    const emailTemplates = ['Welcome', 'Event Reminder', 'Thank You', 'Custom'];

    // Validation
    const validateCampaignForm = () => {
        const newErrors = {};

        if (!campaignForm.name || campaignForm.name.length < 3) {
            newErrors.name = 'Campaign name must be at least 3 characters';
        }

        if (!campaignForm.type) {
            newErrors.type = 'Please select a campaign type';
        }

        if (!campaignForm.description) {
            newErrors.description = 'Description is required';
        }

        if (campaignForm.type === 'Discount Campaign') {
            if (!campaignForm.discount || campaignForm.discount <= 0 || campaignForm.discount > 100) {
                newErrors.discount = 'Discount must be between 1-100%';
            }
            if (!campaignForm.promoCode) {
                newErrors.promoCode = 'Promo code is required for discount campaigns';
            }
        }

        if (!campaignForm.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!campaignForm.endDate || new Date(campaignForm.endDate) <= new Date(campaignForm.startDate)) {
            newErrors.endDate = 'End date must be after start date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // CRUD Operations
    const handleCreateCampaign = () => {
        if (!validateCampaignForm()) return;

        const newCampaign = {
            id: campaigns.length + 1,
            ...campaignForm,
            status: 'Active',
            reach: 0,
            conversions: 0,
            revenue: 0
        };

        setCampaigns([...campaigns, newCampaign]);
        resetCampaignForm();
    };

    const handleEditCampaign = (campaign) => {
        setEditingCampaign(campaign.id);
        setCampaignForm(campaign);
        setShowCampaignForm(true);
    };

    const handleUpdateCampaign = () => {
        if (!validateCampaignForm()) return;

        setCampaigns(campaigns.map(campaign =>
            campaign.id === editingCampaign
                ? { ...campaign, ...campaignForm }
                : campaign
        ));
        resetCampaignForm();
    };

    const handleDeleteCampaign = (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            setCampaigns(campaigns.filter(c => c.id !== id));
        }
    };

    const handlePauseCampaign = (id) => {
        setCampaigns(campaigns.map(campaign =>
            campaign.id === id
                ? { ...campaign, status: campaign.status === 'Active' ? 'Paused' : 'Active' }
                : campaign
        ));
    };

    const resetCampaignForm = () => {
        setCampaignForm({
            name: '',
            type: '',
            description: '',
            discount: '',
            promoCode: '',
            startDate: '',
            endDate: '',
            targetAudience: 'all'
        });
        setShowCampaignForm(false);
        setEditingCampaign(null);
        setErrors({});
    };

    const handleSendEmail = () => {
        // Simulate email sending
        alert('Email campaign sent successfully!');
        setEmailForm({
            subject: '',
            message: '',
            targetAudience: 'all',
            template: 'custom'
        });
        setShowEmailModal(false);
    };

    // Statistics
    const stats = {
        totalCampaigns: campaigns.length,
        activeCampaigns: campaigns.filter(c => c.status === 'Active').length,
        totalReach: campaigns.reduce((sum, campaign) => sum + campaign.reach, 0),
        totalConversions: campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0),
        totalRevenue: campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
    };

    // Modals
    const CampaignFormModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                        {editingCampaign ? 'Edit Campaign' : 'Create Marketing Campaign'}
                    </h3>
                    <button onClick={resetCampaignForm} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                        <input
                            type="text"
                            value={campaignForm.name}
                            onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter campaign name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type *</label>
                        <select
                            value={campaignForm.type}
                            onChange={(e) => setCampaignForm({ ...campaignForm, type: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.type ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Select type</option>
                            {campaignTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea
                            value={campaignForm.description}
                            onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                            rows="3"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Campaign description and goals"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {campaignForm.type === 'Discount Campaign' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%) *</label>
                                <input
                                    type="number"
                                    value={campaignForm.discount}
                                    onChange={(e) => setCampaignForm({ ...campaignForm, discount: e.target.value })}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.discount ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="0"
                                    min="1"
                                    max="100"
                                />
                                {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code *</label>
                                <input
                                    type="text"
                                    value={campaignForm.promoCode}
                                    onChange={(e) => setCampaignForm({ ...campaignForm, promoCode: e.target.value.toUpperCase() })}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.promoCode ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="SAVE20"
                                />
                                {errors.promoCode && <p className="text-red-500 text-sm mt-1">{errors.promoCode}</p>}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <select
                            value={campaignForm.targetAudience}
                            onChange={(e) => setCampaignForm({ ...campaignForm, targetAudience: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Attendees</option>
                            <option value="registered">Registered Users</option>
                            <option value="previous">Previous Event Attendees</option>
                            <option value="vip">VIP Members</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                            <input
                                type="date"
                                value={campaignForm.startDate}
                                onChange={(e) => setCampaignForm({ ...campaignForm, startDate: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.startDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                            <input
                                type="date"
                                value={campaignForm.endDate}
                                onChange={(e) => setCampaignForm({ ...campaignForm, endDate: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.endDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={resetCampaignForm}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={editingCampaign ? handleUpdateCampaign : handleCreateCampaign}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const EmailModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Send Email Campaign</h3>
                    <button onClick={() => setShowEmailModal(false)} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Template</label>
                            <select
                                value={emailForm.template}
                                onChange={(e) => setEmailForm({ ...emailForm, template: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                {emailTemplates.map(template => (
                                    <option key={template} value={template}>{template}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                            <select
                                value={emailForm.targetAudience}
                                onChange={(e) => setEmailForm({ ...emailForm, targetAudience: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="all">All Subscribers</option>
                                <option value="registered">Event Registrants</option>
                                <option value="vip">VIP Members</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                        <input
                            type="text"
                            value={emailForm.subject}
                            onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter email subject"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                            value={emailForm.message}
                            onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                            rows="6"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email message..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowEmailModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSendEmail}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Send Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Marketing & Communication</h2>
                    <p className="text-gray-600 mt-1">Create and manage marketing campaigns to promote your events.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowEmailModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        Send Email
                    </button>
                    <button
                        onClick={() => setShowCampaignForm(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Campaign
                    </button>
                </div>
            </div>

            {/* Marketing Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.totalReach.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Reach</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{stats.totalConversions}</p>
                    <p className="text-sm text-gray-600">Conversions</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                    <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Revenue Generated</p>
                </div>
            </div>

            {/* Marketing Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                    onClick={() => setShowEmailModal(true)}
                    className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                    <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900">Email Marketing</h3>
                    <p className="text-sm text-gray-600 mt-1">Automated campaigns</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer">
                    <Share className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900">Social Media</h3>
                    <p className="text-sm text-gray-600 mt-1">Multi-platform sharing</p>
                </div>
                <div
                    onClick={() => {
                        setCampaignForm({ ...campaignForm, type: 'Discount Campaign' });
                        setShowCampaignForm(true);
                    }}
                    className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                    <Tag className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900">Discount Codes</h3>
                    <p className="text-sm text-gray-600 mt-1">Promo campaigns</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer">
                    <Target className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900">Affiliate Program</h3>
                    <p className="text-sm text-gray-600 mt-1">Referral system</p>
                </div>
            </div>

            {/* Social Media Integration */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold">Social Media Integration</h3>
                    <p className="text-gray-600 text-sm mt-1">Share your events across social media platforms</p>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="flex items-center justify-center gap-3 p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                            <Facebook className="w-5 h-5" />
                            Share on Facebook
                        </button>
                        <button className="flex items-center justify-center gap-3 p-4 border-2 border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition-colors">
                            <Twitter className="w-5 h-5" />
                            Share on Twitter
                        </button>
                        <button className="flex items-center justify-center gap-3 p-4 border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-50 transition-colors">
                            <Linkedin className="w-5 h-5" />
                            Share on LinkedIn
                        </button>
                    </div>
                </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-semibold">Campaign Performance</h3>
                        <p className="text-gray-600 text-sm mt-1">Track and manage your marketing campaigns</p>
                    </div>
                </div>
                <div className="p-6">
                    {campaigns.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No campaigns created yet. Create your first campaign to track performance.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {campaigns.map(campaign => (
                                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Target className="w-4 h-4" />
                                                {campaign.type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {campaign.startDate} - {campaign.endDate}
                                            </span>
                                            {campaign.promoCode && (
                                                <span className="flex items-center gap-1">
                                                    <Tag className="w-4 h-4" />
                                                    {campaign.promoCode}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="text-center">
                                            <p className="font-semibold text-gray-900">{campaign.reach.toLocaleString()}</p>
                                            <p className="text-gray-600">Reach</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-gray-900">{campaign.conversions}</p>
                                            <p className="text-gray-600">Conversions</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-gray-900">${campaign.revenue.toLocaleString()}</p>
                                            <p className="text-gray-600">Revenue</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <button
                                            onClick={() => handlePauseCampaign(campaign.id)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${campaign.status === 'Active'
                                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                }`}
                                        >
                                            {campaign.status === 'Active' ? 'Pause' : 'Resume'}
                                        </button>
                                        <button
                                            onClick={() => handleEditCampaign(campaign)}
                                            className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCampaign(campaign.id)}
                                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showCampaignForm && <CampaignFormModal />}
            {showEmailModal && <EmailModal />}
        </div>
    );
};

export default Marketing;