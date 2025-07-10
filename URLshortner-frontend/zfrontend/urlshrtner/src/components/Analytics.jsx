import { useState } from 'react';

export default function Analytics() {
  const [shortId, setShortId] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState('');

  const handleGetAnalytics = async () => {
    if (!shortId.trim()) {
      setAnalyticsError('Please enter a valid short ID');
      return;
    }

    setIsLoading(true);
    setAnalyticsError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8001';
      const response = await fetch(`${apiUrl}/api/url/analytics/${shortId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      setAnalyticsError('Error fetching analytics. Please check the short ID.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get Analytics</h2>
      
      {/* Info Notice */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Note:</span> Analytics are only available for URLs created within the last 24 hours. Older URLs are automatically deleted.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="shortId" className="block text-sm font-medium text-gray-700 mb-3">
            Enter short ID
          </label>
          <input
            id="shortId"
            type="text"
            value={shortId}
            onChange={(e) => setShortId(e.target.value)}
            placeholder="abc123"
            className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {analyticsError && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {analyticsError}
          </div>
        )}

        <button
          onClick={handleGetAnalytics}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-400 disabled:to-purple-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
        >
          {isLoading ? "Loading..." : "Get Analytics"}
        </button>

        {analytics && (
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Analytics Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-100 shadow-sm">
                <div className="text-sm font-medium text-gray-600 mb-2">Total Clicks</div>
                <div className="text-3xl font-bold text-blue-600">{analytics.totalClicks}</div>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-gray-100 shadow-sm">
                <div className="text-sm font-medium text-gray-600 mb-2">Original URL</div>
                <div className="text-sm text-gray-800 break-all font-medium">{analytics.redirectUrl}</div>
              </div>
            </div>
            
            {/* Expiration Warning */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm text-red-800">
                  <span className="font-semibold">Expiration Notice:</span> This URL will be automatically deleted within 24 hours of creation.
                </span>
              </div>
            </div>
            
            {analytics.visitHistory && analytics.visitHistory.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Recent Visits</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {analytics.visitHistory.slice(-5).reverse().map((visit, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <span className="font-medium">{new Date(visit.timestamp).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

