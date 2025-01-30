// /models/User.js
<<<<<<< HEAD
import mongoose from 'mongoose';
=======
const mongoose = require('mongoose');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    subscriptionStatus: { type: String, enum: ['free', 'premium'], default: 'free' },
    streaks: { type: Number, default: 0 },
    leaderboardRank: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
