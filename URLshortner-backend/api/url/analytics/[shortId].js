import connectDB from '../../../db';
import URL from '../../../models/url';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await connectDB();
  const { shortId } = req.query;
  try {
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
