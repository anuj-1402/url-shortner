import connectDB from '../../db';
import URL from '../../models/url';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await connectDB();
  const body = req.body;
  if (!body || !body.redirectUrl) {
    return res.status(400).json({ error: 'redirectUrl is required' });
  }
  const shortId = nanoid(8);
  await URL.create({
    shortId,
    redirectUrl: body.redirectUrl,
    visitHistory: []
  });
  return res.json({ shortId });
}
