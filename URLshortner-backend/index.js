require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT=8001;

// Enable CORS for frontend communication
const allowedOrigins = [
    'http://localhost:5173', // Local development
    'http://localhost:3000', // Alternative local port
    process.env.FRONTEND_URL, // Production frontend URL
    process.env.CUSTOM_DOMAIN ? `https://${process.env.CUSTOM_DOMAIN}` : null
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

const connectDB = require('./db'); // Import the shared DB connection
const cleanupService = require('./services/cleanupService'); // Import cleanup service

connectDB()
    .then(() => {
        console.log('Connected to MongoDB');
        // Start automatic cleanup service after DB connection
        cleanupService.startAutomaticCleanup();
    })
    .catch(err => console.error('Database connection error:', err));

const urlRoutes = require('./routes/url'); // Import the URL routes
const adminRoutes = require('./routes/admin'); // Import the admin routes

app.use(express.json()); // Middleware to parse JSON bodies

// Root route for health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'URL Shortener API is running!', 
        status: 'healthy',
        endpoints: {
            shorten: '/api/url/shorten',
            redirect: '/api/url/:shortId',
            check: '/api/url/check'
        }
    });
});

app.use('/api/url', urlRoutes); // Use the URL routes under the /api/url path
app.use('/api/admin', adminRoutes); // Use the admin routes under the /api/admin path
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    cleanupService.stopAutomaticCleanup();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    cleanupService.stopAutomaticCleanup();
    process.exit(0);
});
