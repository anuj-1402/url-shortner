import { useState } from 'react';
import { urlService } from '../services/urlService';

export function useAnalytics() {
  const [shortId, setShortId] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState('');

  const handleGetAnalytics = async () => {
    if (!shortId.trim()) {
      setAnalyticsError('Please enter a valid short ID');
      return;
    }

    setIsLoadingAnalytics(true);
    setAnalyticsError('');

    try {
      const data = await urlService.getAnalytics(shortId);
      setAnalytics(data);
    } catch (error) {
      setAnalyticsError('Error fetching analytics. Please check the short ID.');
      console.error('Error:', error);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  return {
    shortId,
    setShortId,
    analytics,
    isLoadingAnalytics,
    analyticsError,
    handleGetAnalytics
  };
}
