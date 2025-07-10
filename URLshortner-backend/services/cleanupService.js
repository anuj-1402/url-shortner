const URL = require('../models/url');

class CleanupService {
    constructor() {
        this.isRunning = false;
    }

    // Manual cleanup function to delete expired URLs
    async cleanupExpiredUrls() {
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
            
            const result = await URL.deleteMany({
                createdAt: { $lt: oneDayAgo }
            });

            console.log(`🧹 Cleanup completed: Deleted ${result.deletedCount} expired URLs`);
            return result.deletedCount;
        } catch (error) {
            console.error('❌ Error during cleanup:', error);
            throw error;
        }
    }

    // Start automatic cleanup that runs every hour
    startAutomaticCleanup() {
        if (this.isRunning) {
            console.log('⚠️ Cleanup service is already running');
            return;
        }

        this.isRunning = true;
        console.log('🚀 Starting automatic cleanup service (runs every hour)');

        // Run cleanup immediately on start
        this.cleanupExpiredUrls();

        // Set up interval to run cleanup every hour (3600000 ms)
        this.cleanupInterval = setInterval(() => {
            this.cleanupExpiredUrls();
        }, 3600000); // 1 hour
    }

    // Stop automatic cleanup
    stopAutomaticCleanup() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
            this.isRunning = false;
            console.log('🛑 Automatic cleanup service stopped');
        }
    }

    // Get stats about URLs
    async getUrlStats() {
        try {
            const totalUrls = await URL.countDocuments();
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const expiredUrls = await URL.countDocuments({
                createdAt: { $lt: oneDayAgo }
            });

            return {
                totalUrls,
                expiredUrls,
                activeUrls: totalUrls - expiredUrls
            };
        } catch (error) {
            console.error('Error getting URL stats:', error);
            throw error;
        }
    }
}

module.exports = new CleanupService();
