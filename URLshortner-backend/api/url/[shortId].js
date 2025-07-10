import connectDB from '../../db';
import URL from '../../models/url';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await connectDB();
  const { shortId } = req.query;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    res.writeHead(302, { Location: entry.redirectUrl });
    res.end();
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
