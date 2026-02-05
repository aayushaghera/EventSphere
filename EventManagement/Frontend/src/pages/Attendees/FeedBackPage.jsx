import React, { useState } from 'react';
import { Star, Send, MessageCircle, TrendingUp, Users, ThumbsUp, ThumbsDown, BarChart3, PieChart, Calendar, Filter, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const FeedbackPage = () => {
  const [activeTab, setActiveTab] = useState('submit');
  const [selectedEvent, setSelectedEvent] = useState('tech-conf-2025');
  const [feedbackForm, setFeedbackForm] = useState({
    overallRating: 0,
    speakerRating: 0,
    venueRating: 0,
    organizationRating: 0,
    foodRating: 0,
    networkingRating: 0,
    comments: '',
    recommendations: '',
    wouldRecommend: null,
    futureInterests: []
  });

  const [feedbackData, setFeedbackData] = useState({
    totalResponses: 847,
    responseRate: 68,
    averageRating: 4.3,
    netPromoterScore: 72
  });

  // Sample analytics data
  const ratingTrends = [
    { date: '2025-01', overall: 4.1, speaker: 4.3, venue: 3.9, organization: 4.0 },
    { date: '2025-02', overall: 4.2, speaker: 4.4, venue: 4.1, organization: 4.2 },
    { date: '2025-03', overall: 4.0, speaker: 4.2, venue: 3.8, organization: 3.9 },
    { date: '2025-04', overall: 4.4, speaker: 4.6, venue: 4.2, organization: 4.3 },
    { date: '2025-05', overall: 4.3, speaker: 4.5, venue: 4.0, organization: 4.1 },
    { date: '2025-06', overall: 4.5, speaker: 4.7, venue: 4.3, organization: 4.4 }
  ];

  const satisfactionDistribution = [
    { name: 'Very Satisfied', value: 45, color: '#10B981' },
    { name: 'Satisfied', value: 35, color: '#3B82F6' },
    { name: 'Neutral', value: 15, color: '#F59E0B' },
    { name: 'Dissatisfied', value: 4, color: '#EF4444' },
    { name: 'Very Dissatisfied', value: 1, color: '#7F1D1D' }
  ];

  const categoryRatings = [
    { category: 'Speakers', rating: 4.5, responses: 823 },
    { category: 'Content', rating: 4.3, responses: 847 },
    { category: 'Venue', rating: 4.0, responses: 801 },
    { category: 'Organization', rating: 4.2, responses: 835 },
    { category: 'Food & Beverage', rating: 3.8, responses: 756 },
    { category: 'Networking', rating: 4.4, responses: 789 }
  ];

  const recentFeedback = [
    {
      id: 1,
      attendeeName: 'Anonymous',
      rating: 5,
      comment: 'Outstanding event! The speakers were incredibly knowledgeable and the networking opportunities were fantastic.',
      date: '2025-09-20',
      event: 'Tech Conference 2025',
      helpful: 12,
      category: 'General'
    },
    {
      id: 2,
      attendeeName: 'John D.',
      rating: 4,
      comment: 'Great content overall, but the venue was a bit crowded during lunch breaks.',
      date: '2025-09-19',
      event: 'Tech Conference 2025',
      helpful: 8,
      category: 'Venue'
    },
    {
      id: 3,
      attendeeName: 'Sarah M.',
      rating: 5,
      comment: 'Best tech conference I\'ve attended this year. Excellent speaker lineup and well-organized sessions.',
      date: '2025-09-19',
      event: 'Tech Conference 2025',
      helpful: 15,
      category: 'Content'
    }
  ];

  const handleRatingChange = (category, rating) => {
    setFeedbackForm(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  const handleSubmitFeedback = () => {
    // Validate required fields
    if (feedbackForm.overallRating === 0) {
      alert('Please provide an overall rating');
      return;
    }
    
    alert('Thank you for your feedback! Your response has been submitted.');
    // Reset form
    setFeedbackForm({
      overallRating: 0,
      speakerRating: 0,
      venueRating: 0,
      organizationRating: 0,
      foodRating: 0,
      networkingRating: 0,
      comments: '',
      recommendations: '',
      wouldRecommend: null,
      futureInterests: []
    });
  };

  const StarRating = ({ rating, onRatingChange, size = 20, readOnly = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readOnly && onRatingChange(star)}
            disabled={readOnly}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              size={size}
              className={`${
                star <= rating
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const FeedbackSubmissionTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Event Feedback</h2>
        <p className="text-gray-600 mb-6">
          Your feedback helps us improve future events. Please take a few minutes to share your experience.
        </p>

        <form className="space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Overall Event Rating *
            </label>
            <div className="flex items-center gap-4">
              <StarRating
                rating={feedbackForm.overallRating}
                onRatingChange={(rating) => handleRatingChange('overallRating', rating)}
                size={24}
              />
              <span className="text-sm text-gray-600">
                {feedbackForm.overallRating > 0 && 
                  ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][feedbackForm.overallRating - 1]
                }
              </span>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Speaker Quality</label>
              <StarRating
                rating={feedbackForm.speakerRating}
                onRatingChange={(rating) => handleRatingChange('speakerRating', rating)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue & Facilities</label>
              <StarRating
                rating={feedbackForm.venueRating}
                onRatingChange={(rating) => handleRatingChange('venueRating', rating)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Organization</label>
              <StarRating
                rating={feedbackForm.organizationRating}
                onRatingChange={(rating) => handleRatingChange('organizationRating', rating)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Food & Beverage</label>
              <StarRating
                rating={feedbackForm.foodRating}
                onRatingChange={(rating) => handleRatingChange('foodRating', rating)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Networking Opportunities</label>
              <StarRating
                rating={feedbackForm.networkingRating}
                onRatingChange={(rating) => handleRatingChange('networkingRating', rating)}
              />
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Would you recommend this event to a colleague?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFeedbackForm(prev => ({ ...prev, wouldRecommend: true }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  feedbackForm.wouldRecommend === true
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ThumbsUp size={16} />
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFeedbackForm(prev => ({ ...prev, wouldRecommend: false }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  feedbackForm.wouldRecommend === false
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ThumbsDown size={16} />
                No
              </button>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Additional Comments
            </label>
            <textarea
              value={feedbackForm.comments}
              onChange={(e) => setFeedbackForm(prev => ({ ...prev, comments: e.target.value }))}
              rows={4}
              placeholder="What did you like most about the event? What could be improved?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Recommendations */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Suggestions for Future Events
            </label>
            <textarea
              value={feedbackForm.recommendations}
              onChange={(e) => setFeedbackForm(prev => ({ ...prev, recommendations: e.target.value }))}
              rows={3}
              placeholder="Topics you'd like to see, speakers to invite, format improvements..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmitFeedback}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={16} />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Responses</p>
              <p className="text-2xl font-bold text-gray-900">{feedbackData.totalResponses}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-green-600">{feedbackData.responseRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{feedbackData.averageRating}/5</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Promoter Score</p>
              <p className="text-2xl font-bold text-blue-600">{feedbackData.netPromoterScore}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Rating Trends Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Rating Trends Over Time</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">6M</button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">1Y</button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ratingTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Line type="monotone" dataKey="overall" stroke="#8B5CF6" strokeWidth={2} name="Overall" />
            <Line type="monotone" dataKey="speaker" stroke="#10B981" strokeWidth={2} name="Speakers" />
            <Line type="monotone" dataKey="venue" stroke="#3B82F6" strokeWidth={2} name="Venue" />
            <Line type="monotone" dataKey="organization" stroke="#F59E0B" strokeWidth={2} name="Organization" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Satisfaction Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Satisfaction Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={satisfactionDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {satisfactionDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Ratings */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Category Ratings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryRatings} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="category" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="rating" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Category Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Detailed Category Breakdown</h3>
        <div className="space-y-4">
          {categoryRatings.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category.category}</span>
                  <span className="text-sm text-gray-600">{category.responses} responses</span>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={Math.round(category.rating)} readOnly size={16} />
                  <span className="font-semibold text-lg">{category.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FeedbackListTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Feedback</h2>
          <div className="flex gap-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>1-2 Stars</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>General</option>
              <option>Speakers</option>
              <option>Venue</option>
              <option>Content</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {recentFeedback.map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{feedback.attendeeName}</div>
                    <div className="text-sm text-gray-600">{feedback.event}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={feedback.rating} readOnly size={14} />
                    <span className="text-sm text-gray-600">
                      {new Date(feedback.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {feedback.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{feedback.comment}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                    <ThumbsUp size={14} />
                    Helpful ({feedback.helpful})
                  </button>
                  <button className="text-sm text-gray-600 hover:text-blue-600">
                    Reply
                  </button>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Load More Feedback
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Feedback & Analytics</h1>
          
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
              onClick={() => setActiveTab('submit')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'submit'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Submit Feedback
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics Dashboard
            </button>
            <button
              onClick={() => setActiveTab('feedback-list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'feedback-list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Feedback
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'submit' && <FeedbackSubmissionTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'feedback-list' && <FeedbackListTab />}
      </div>
    </div>
  );
};

export default FeedbackPage;