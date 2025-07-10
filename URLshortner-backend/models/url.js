const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {
            type: Number
        }
    }],
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds (1 day)
    }
}, { timestamps: true });
const URL= mongoose.model('URL', urlSchema);
module.exports = URL;
// This code defines a Mongoose schema for a URL shortener application.