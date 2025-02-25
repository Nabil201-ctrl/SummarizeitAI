// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For local auth
  googleId: String, // For Google auth
  name: String,
  plan: { type: String, default: 'Freemium' }, // Freemium, Basic, Premium
  streaks: { type: Number, default: 0 },
  theme: { type: String, default: 'dark' }, // dark, light
  onboarded: { type: Boolean, default: false },
  paymentHistory: [Object], // PayPal transactions
  authTokens: [{ type: String }], // Store refresh tokens
  autoLogin: { type: Boolean, default: true }, // Enable auto-login
  loginCount: { type: Number, default: 0 }, // Track logins for review popup
  actionCount: { type: Number, default: 0 }, // Track actions for review popup
  reviewed: { type: Boolean, default: false }, // Track if user reviewed
  review: { rating: Number, feedback: String, date: Date } // Store review data
});

module.exports = mongoose.model('User', userSchema);