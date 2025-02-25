// middleware/auth.js
const User = require('../models/User');

module.exports = {
  isAuthenticated: (req, res, next) => {
    // Comment: Checks if user is authenticated for auto-login, optimized for performance
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },

  ensureAutoLogin: (req, res, next) => {
    // Comment: Redirects to Dashboard if auto-login is enabled, with fade-in and slide-up animations
    if (req.isAuthenticated() && req.user.autoLogin) {
      return res.redirect('/dashboard');
    }
    next();
  }
};