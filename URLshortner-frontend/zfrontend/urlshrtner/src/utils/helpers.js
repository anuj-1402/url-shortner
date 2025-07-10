export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function generateShortUrl(baseUrl, shortId) {
  return `${baseUrl}/api/url/${shortId}`;
}
