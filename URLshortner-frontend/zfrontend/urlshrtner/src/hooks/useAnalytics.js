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

    console.log('Fetching analytics for shortId:', shortId);
    setIsLoadingAnalytics(true);
    setAnalyticsError('');

    try {
      const data = await urlService.getAnalytics(shortId.trim());
      console.log('Analytics data received:', data);
      setAnalytics(data);
    } catch (error) {
      console.error('Analytics error details:', error);
      setAnalyticsError(`Error fetching analytics: ${error.message}`);
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
