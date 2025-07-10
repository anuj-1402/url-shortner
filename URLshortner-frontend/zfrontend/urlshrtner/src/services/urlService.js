const API_BASE_URL = 'https://urlshortnerbackend-1kvx.onrender.com/api/url';

export const urlService = {
  async checkUrlExists(redirectUrl) {
    try {
      const url = `${API_BASE_URL}/check`;
      console.log('Making check request to:', url);
      console.log('Request payload:', { redirectUrl });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ redirectUrl }),
      });

      console.log('Check response status:', response.status);
      console.log('Check response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Check URL Error:', response.status, errorText);
        throw new Error(`Failed to check URL: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Check response data:', data);
      return data;
    } catch (error) {
      console.error('Network error checking URL:', error);
      console.error('Error details:', error.message);
      throw error;
    }
  },

  async shortenUrl(redirectUrl, forceNew = false) {
    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ redirectUrl, forceNew }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    return response.json();
  },

  async getAnalytics(shortId) {
    try {
      const url = `${API_BASE_URL}/analytics/${shortId}`;
      console.log('Making analytics request to:', url);
      const response = await fetch(url);

      console.log('Analytics response status:', response.status);
      console.log('Analytics response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Analytics Error:', response.status, errorText);
        throw new Error(`Failed to fetch analytics: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Analytics response data:', data);
      return data;
    } catch (error) {
      console.error('Network error fetching analytics:', error);
      throw error;
    }
  },

  async redirectToUrl(shortId) {
    const response = await fetch(`${API_BASE_URL}/${shortId}`);
    
    if (!response.ok) {
      throw new Error('Short URL not found');
    }

    return response;
  }
};
