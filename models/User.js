// /models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    subscriptionStatus: { type: String, enum: ['free', 'premium'], default: 'free' },
    streaks: { type: Number, default: 0 },
    leaderboardRank: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
