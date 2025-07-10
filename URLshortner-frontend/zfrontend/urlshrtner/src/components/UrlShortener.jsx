import { useState } from 'react';
import UrlExistsModal from './UI/UrlExistsModal';
import { urlService } from '../services/urlService';

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [shortenError, setShortenError] = useState('');
  const [isExisting, setIsExisting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [existingUrlData, setExistingUrlData] = useState(null);

  // Reset all states when URL input changes
  const handleUrlChange = (value) => {
    setLongUrl(value);
    setShortUrl('');
    setShortenError('');
    setIsExisting(false);
    setShowModal(false);
    setExistingUrlData(null);
  };

  const handleShortenUrl = async () => {
    if (!longUrl.trim()) {
      setShortenError('Please enter a valid URL');
      return;
    }

    console.log('Starting URL shortening process for:', longUrl);
    console.log('Current state - showModal:', showModal, 'existingUrlData:', existingUrlData);

    setIsShortening(true);
    setShortenError('');

    try {
      // First check if URL exists using urlService
      const checkData = await urlService.checkUrlExists(longUrl);
      console.log('Check response:', checkData);
      
      if (checkData.exists) {
        // URL exists, show modal for user choice
        console.log('URL exists, showing modal');
        setExistingUrlData(checkData);
        setShowModal(true);
        setIsShortening(false);
        return;
      }

      // URL doesn't exist, create new one directly
      console.log('URL does not exist, creating new one');
      await createNewShortUrl(false);
      
    } catch (error) {
      setShortenError('Error checking URL. Please try again.');
      console.error('Error:', error);
      setIsShortening(false);
    }
  };

  const createNewShortUrl = async (forceNew = false) => {
    try {
      const data = await urlService.shortenUrl(longUrl, forceNew);
      const generatedShortUrl = `https://urlshortnerbackend-1kvx.onrender.com/${data.shortId}`;
      setShortUrl(generatedShortUrl);
      setIsExisting(data.isExisting || false);
      setIsShortening(false);
    } catch (error) {
      setShortenError('Error shortening URL. Please try again.');
      console.error('Error:', error);
      setIsShortening(false);
    }
  };

  const handleUseExisting = () => {
    const existingShortUrl = `https://urlshortnerbackend-1kvx.onrender.com/${existingUrlData.shortId}`;
    setShortUrl(existingShortUrl);
    setIsExisting(true);
    setShowModal(false);
  };

  const handleCreateNew = async () => {
    setShowModal(false);
    setIsShortening(true);
    await createNewShortUrl(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsShortening(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Shorten URL</h2>
      
      {/* Expiration Notice */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Auto-Delete Notice:</span> Shortened URLs will be automatically deleted after 24 hours for privacy and storage optimization.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-3">
            Enter your long URL
          </label>
          <input
            id="longUrl"
            type="url"
            value={longUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {shortenError && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {shortenError}
          </div>
        )}

        <button
          onClick={handleShortenUrl}
          disabled={isShortening}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
        >
          {isShortening ? "Shortening..." : "Shorten URL"}
        </button>

        {shortUrl && (
          <div className={`mt-8 p-6 ${isExisting ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'} rounded-xl`}>
            <div className="flex items-center mb-3">
              {isExisting ? (
                <>
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <label className="text-sm font-semibold text-blue-800">Existing short URL retrieved!</label>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <label className="text-sm font-semibold text-green-800">New short URL created!</label>
                </>
              )}
            </div>
            
            {isExisting && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Info:</span> This URL was previously shortened. We're showing you the existing short URL to maintain consistency and combine analytics.
                </p>
              </div>
            )}
            
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className={`flex-1 px-4 py-3 bg-white border-2 ${isExisting ? 'border-blue-300 text-blue-800' : 'border-green-300 text-green-800'} rounded-lg focus:outline-none font-medium`}
              />
              <button
                onClick={copyToClipboard}
                className={`px-6 py-3 ${isExisting ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'} text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
              >
                Copy
              </button>
            </div>
            <div className={`flex items-center text-sm ${isExisting ? 'text-blue-700 bg-blue-100' : 'text-green-700 bg-green-100'} p-3 rounded-lg`}>
              <svg className="h-4 w-4 mr-2 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-medium">Expires in 24 hours</span> - This link will be automatically deleted after 1 day
            </div>
          </div>
        )}
      </div>
      
      <UrlExistsModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onUseExisting={handleUseExisting}
        onCreateNew={handleCreateNew}
        existingShortId={existingUrlData?.shortId}
        longUrl={longUrl}
      />
    </div>
  );
}
