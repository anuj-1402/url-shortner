import { useState } from 'react';
import { urlService } from '../services/urlService';
import { copyToClipboard } from '../utils/clipboard';

export function useUrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [shortenError, setShortenError] = useState('');
  const [isExisting, setIsExisting] = useState(false);

  const handleShortenUrl = async (forceNew = false) => {
    if (!longUrl.trim()) {
      setShortenError('Please enter a valid URL');
      return;
    }

    setIsShortening(true);
    setShortenError('');

    try {
      const data = await urlService.shortenUrl(longUrl, forceNew);
      const generatedShortUrl = `https://urlshortnerbackend-1kvx.onrender.com/${data.shortId}`;
      setShortUrl(generatedShortUrl);
      setIsExisting(data.isExisting || false);
    } catch (error) {
      setShortenError('Error shortening URL. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsShortening(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await copyToClipboard(shortUrl);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return {
    longUrl,
    setLongUrl,
    shortUrl,
    isShortening,
    shortenError,
    isExisting,
    handleShortenUrl,
    copyToClipboard: handleCopyToClipboard
  };
}
