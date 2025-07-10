export default function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">URL Shortener</h1>
      <p className="text-xl text-gray-600 mb-4">Shorten your URLs and track their analytics</p>
      <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
        <svg className="h-4 w-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className="font-medium">Privacy-First:</span> All URLs auto-delete after 24 hours
      </div>
    </div>
  );
}
