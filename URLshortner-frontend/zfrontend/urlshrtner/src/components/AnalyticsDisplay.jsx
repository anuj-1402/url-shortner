export default function AnalyticsDisplay({ analytics }) {
  return (
    <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Analytics Results</h3>

      <div className="mb-4">
        <span className="text-sm font-medium text-purple-700">Total Clicks:</span>
        <span className="ml-2 text-2xl font-bold text-purple-900">{analytics.totalClicks}</span>
      </div>

      {analytics.analytics && analytics.analytics.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-purple-700 mb-3">Click History:</h4>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {analytics.analytics.map((item, index) => (
              <div key={index} className="text-sm text-purple-600 bg-white px-3 py-2 rounded border">
                {new Date(item.timestamp).toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
