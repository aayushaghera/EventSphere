// src/pages/Admin/SystemConfiguration.jsx
import React, { useState } from 'react';
import { Plus, X, Save, Settings, Globe, Shield, Bell, Mail, CreditCard, Users } from 'lucide-react';

const SystemConfiguration = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // JSON data for event categories - API ready
  const [eventCategories, setEventCategories] = useState([
    { id: 1, name: 'Technology', isActive: true, eventCount: 142 },
    { id: 2, name: 'Music', isActive: true, eventCount: 112 },
    { id: 3, name: 'Business', isActive: true, eventCount: 91 },
    { id: 4, name: 'Sports', isActive: true, eventCount: 76 },
    { id: 5, name: 'Education', isActive: true, eventCount: 51 },
    { id: 6, name: 'Art & Culture', isActive: true, eventCount: 35 },
    { id: 7, name: 'Food & Drink', isActive: false, eventCount: 23 }
  ]);

  // JSON data for system settings - API ready
  const [systemSettings, setSystemSettings] = useState({
    general: {
      platformName: 'EventHub',
      platformDescription: 'Your premier event management platform',
      supportEmail: 'support@eventhub.com',
      maxEventsPerUser: 50,
      defaultEventDuration: 120,
      timeZone: 'UTC',
      currency: 'USD'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: true,
      eventReminders: true,
      adminAlerts: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      requireEmailVerification: true,
      enableCaptcha: true
    },
    payments: {
      stripeEnabled: true,
      paypalEnabled: true,
      platformFee: 2.5,
      minimumWithdrawal: 50,
      processingTime: 7
    },
    policies: {
      termsOfService: 'By using this platform, you agree to our terms and conditions...',
      privacyPolicy: 'We collect and use your information in accordance with our privacy policy...',
      refundPolicy: 'Refunds are processed within 5-7 business days...',
      communityGuidelines: 'Please maintain respectful and appropriate behavior...'
    }
  });

  // Tab configuration
  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'categories', label: 'Event Categories', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'policies', label: 'Policies', icon: Globe }
  ];

  // Handle adding new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat = {
        id: Date.now(),
        name: newCategory.trim(),
        isActive: true,
        eventCount: 0
      };
      setEventCategories([...eventCategories, newCat]);
      setNewCategory('');
    }
  };

  // Handle removing category
  const handleRemoveCategory = (id) => {
    const category = eventCategories.find(cat => cat.id === id);
    if (category && category.eventCount > 0) {
      if (!confirm(`This category has ${category.eventCount} events. Are you sure you want to remove it?`)) {
        return;
      }
    }
    setEventCategories(eventCategories.filter(cat => cat.id !== id));
  };

  // Handle toggling category status
  const handleToggleCategory = (id) => {
    setEventCategories(eventCategories.map(cat =>
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  // Handle settings update
  const handleUpdateSettings = (section, key, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    setIsLoading(true);
    
    // Here you would make API calls to save settings
    try {
      console.log('Saving system settings:', systemSettings);
      console.log('Saving event categories:', eventCategories);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render general settings
  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
          <input
            type="text"
            value={systemSettings.general.platformName}
            onChange={(e) => handleUpdateSettings('general', 'platformName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
          <input
            type="email"
            value={systemSettings.general.supportEmail}
            onChange={(e) => handleUpdateSettings('general', 'supportEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Description</label>
        <textarea
          rows="3"
          value={systemSettings.general.platformDescription}
          onChange={(e) => handleUpdateSettings('general', 'platformDescription', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Events Per User</label>
          <input
            type="number"
            value={systemSettings.general.maxEventsPerUser}
            onChange={(e) => handleUpdateSettings('general', 'maxEventsPerUser', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Event Duration (min)</label>
          <input
            type="number"
            value={systemSettings.general.defaultEventDuration}
            onChange={(e) => handleUpdateSettings('general', 'defaultEventDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={systemSettings.general.currency}
            onChange={(e) => handleUpdateSettings('general', 'currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD ($)</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Render event categories
  const renderEventCategories = () => (
    <div className="space-y-6">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
          className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          disabled={!newCategory.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="space-y-3">
        {eventCategories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={category.isActive}
                  onChange={() => handleToggleCategory(category.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div>
                <span className={`font-medium ${category.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {category.name}
                </span>
                <div className="text-sm text-gray-500">
                  {category.eventCount} events
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemoveCategory(category.id)}
              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Render notification settings
  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(systemSettings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <label className="font-medium text-gray-900">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            <p className="text-sm text-gray-500">
              {key === 'emailNotifications' && 'Send notifications via email'}
              {key === 'smsNotifications' && 'Send notifications via SMS'}
              {key === 'pushNotifications' && 'Send browser push notifications'}
              {key === 'marketingEmails' && 'Send marketing and promotional emails'}
              {key === 'eventReminders' && 'Send event reminders to attendees'}
              {key === 'adminAlerts' && 'Send alerts to administrators'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleUpdateSettings('notifications', key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      ))}
    </div>
  );

  // Render security settings
  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={systemSettings.security.sessionTimeout}
            onChange={(e) => handleUpdateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={systemSettings.security.maxLoginAttempts}
            onChange={(e) => handleUpdateSettings('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {['twoFactorAuth', 'requireEmailVerification', 'enableCaptcha'].map((key) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900">
                {key === 'twoFactorAuth' && 'Two-Factor Authentication'}
                {key === 'requireEmailVerification' && 'Require Email Verification'}
                {key === 'enableCaptcha' && 'Enable CAPTCHA'}
              </label>
              <p className="text-sm text-gray-500">
                {key === 'twoFactorAuth' && 'Require users to enable 2FA for enhanced security'}
                {key === 'requireEmailVerification' && 'Users must verify email before account activation'}
                {key === 'enableCaptcha' && 'Enable CAPTCHA verification for login and registration'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.security[key]}
                onChange={(e) => handleUpdateSettings('security', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // Render payment settings
  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform Fee (%)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={systemSettings.payments.platformFee}
            onChange={(e) => handleUpdateSettings('payments', 'platformFee', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Fee charged on each transaction</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Withdrawal Amount</label>
          <input
            type="number"
            min="1"
            value={systemSettings.payments.minimumWithdrawal}
            onChange={(e) => handleUpdateSettings('payments', 'minimumWithdrawal', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum amount users can withdraw</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Processing Time (days)</label>
        <input
          type="number"
          min="1"
          max="30"
          value={systemSettings.payments.processingTime}
          onChange={(e) => handleUpdateSettings('payments', 'processingTime', parseInt(e.target.value))}
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">Time to process withdrawals</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Payment Gateways</h3>
        {['stripeEnabled', 'paypalEnabled'].map((key) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                key === 'stripeEnabled' ? 'bg-blue-100' : 'bg-yellow-100'
              }`}>
                <CreditCard className={`w-5 h-5 ${
                  key === 'stripeEnabled' ? 'text-blue-600' : 'text-yellow-600'
                }`} />
              </div>
              <div>
                <span className="font-medium text-gray-900">
                  {key === 'stripeEnabled' ? 'Stripe' : 'PayPal'}
                </span>
                <p className="text-sm text-gray-500">
                  {key === 'stripeEnabled' ? 'Credit card and bank transfer processing' : 'PayPal payment processing'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.payments[key]}
                onChange={(e) => handleUpdateSettings('payments', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // Render policies
  const renderPolicies = () => (
    <div className="space-y-6">
      {Object.entries(systemSettings.policies).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {key === 'termsOfService' && 'Terms of Service'}
            {key === 'privacyPolicy' && 'Privacy Policy'}
            {key === 'refundPolicy' && 'Refund Policy'}
            {key === 'communityGuidelines' && 'Community Guidelines'}
          </label>
          <p className="text-xs text-gray-500 mb-2">
            {key === 'termsOfService' && 'Legal terms and conditions for platform usage'}
            {key === 'privacyPolicy' && 'How user data is collected and used'}
            {key === 'refundPolicy' && 'Refund and cancellation policies'}
            {key === 'communityGuidelines' && 'Community behavior and content guidelines'}
          </p>
          <textarea
            rows="6"
            value={value}
            onChange={(e) => handleUpdateSettings('policies', key, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} text here...`}
          />
        </div>
      ))}
    </div>
  );

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'categories':
        return renderEventCategories();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'payments':
        return renderPaymentSettings();
      case 'policies':
        return renderPolicies();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">System Configuration</h1>
        <button
          onClick={handleSaveChanges}
          disabled={isLoading}
          className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Save size={16} />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div className="max-w-4xl">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Save Changes Footer */}
      <div className="mt-6 flex justify-end">
        <div className="text-sm text-gray-500">
          Changes are automatically saved when you click "Save Changes"
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;