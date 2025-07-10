const express = require('express');
const router = express.Router();
const cleanupService = require('../services/cleanupService');

// GET /api/admin/stats - Get URL statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await cleanupService.getUrlStats();
        res.json({
            success: true,
            stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to get stats'
        });
    }
});

// POST /api/admin/cleanup - Manually trigger cleanup
router.post('/cleanup', async (req, res) => {
    try {
        const deletedCount = await cleanupService.cleanupExpiredUrls();
        res.json({
            success: true,
            message: `Deleted ${deletedCount} expired URLs`,
            deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to perform cleanup'
        });
    }
});

module.exports = router;
