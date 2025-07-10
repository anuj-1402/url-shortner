const URL = require('../models/url'); // Import the URL model
const { nanoid } = require('nanoid'); // Import nanoid for generating unique IDs



async function createShortURL(req, res) {
    const body = req.body;
    if (!body || !body.redirectUrl) {   // Check if redirectUrl is provided
        return res.status(400).json({ error: 'redirectUrl is required' });
    }
    
    // Check if user wants to force a new short URL (optional parameter)
    const forceNew = body.forceNew === true;
    
    // Always check if URL already exists
    const existingUrl = await URL.findOne({ redirectUrl: body.redirectUrl });
    
    // If URL exists and user hasn't explicitly chosen to force new, offer existing
    if (existingUrl && !forceNew) {
        return res.json({
            shortId: existingUrl.shortId,
            isExisting: true,
            hasExisting: true,
            redirectUrl: body.redirectUrl
        });
    }
    
    // If forcing new or URL doesn't exist, create new one
    const shortId = nanoid(8); // Generate a unique short ID
    await URL.create({
        shortId: shortId,
        redirectUrl: body.redirectUrl,
        visitHistory: []
    });
    return res.json({
        shortId: shortId,
        isExisting: false,
        hasExisting: existingUrl ? true : false,
        redirectUrl: body.redirectUrl
    });
}

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;
    
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );
        
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        
        res.redirect(entry.redirectUrl);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    
    try {
        const result = await URL.findOne({ shortId });
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        
        return res.json({
            totalClicks: result.visitHistory.length,
            redirectUrl: result.redirectUrl,
            visitHistory: result.visitHistory
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}

async function checkUrlExists(req, res) {
    const body = req.body;
    if (!body || !body.redirectUrl) {
        return res.status(400).json({ error: 'redirectUrl is required' });
    }
    
    const existingUrl = await URL.findOne({ redirectUrl: body.redirectUrl });
    
    return res.json({
        exists: !!existingUrl,
        shortId: existingUrl ? existingUrl.shortId : null,
        redirectUrl: body.redirectUrl
    });
}

module.exports = {
    createShortURL,
    handleRedirect,
    getAnalytics,
    checkUrlExists
};