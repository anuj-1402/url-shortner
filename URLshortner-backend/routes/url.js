const express = require('express');
const { createShortURL, handleRedirect, getAnalytics, checkUrlExists } = require('../controllers/url'); // Import the controller functions
const router = express.Router();

router.post('/shorten', createShortURL); // Define the route for creating a short URL
router.post('/check', checkUrlExists); // Define the route for checking if URL exists
router.get('/analytics/:shortId', getAnalytics); // Define the route for getting analytics - MUST be before /:shortId
router.get('/:shortId', handleRedirect); // Define the route for redirecting to original URL

module.exports = router; // Export the router to be used in the main app

