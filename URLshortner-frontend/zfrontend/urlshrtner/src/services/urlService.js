const API_BASE_URL = '/api/url';

export const urlService = {
  async checkUrlExists(redirectUrl) {
    const response = await fetch(`${API_BASE_URL}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ redirectUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to check URL');
    }

    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/analytics/${shortId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }

    return response.json();
  },

  async redirectToUrl(shortId) {
    const response = await fetch(`${API_BASE_URL}/${shortId}`);
    
    if (!response.ok) {
      throw new Error('Short URL not found');
    }

    return response;
  }
};
