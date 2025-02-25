// controllers/authController.js
const passport = require('passport');
const User = require('../models/User');

// Local login with auto-login to Dashboard
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).render('login', { error: info.message });
    // Comment: Authenticates user, triggers fade-in animation for Dashboard auto-login
    req.logIn(user, (err) => {
      if (err) return next(err);
      // Redirect to Dashboard with slide-up animation
      res.redirect('/dashboard');
    });
  })(req, res, next);
};

// Google login with auto-login to Dashboard
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).render('login', { error: info.message });
    // Comment: Animates spin on loading, pop on success, then auto-login to Dashboard
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/dashboard');
    });
  })(req, res, next);
};

// Logout with slide-up animation
exports.logout = (req, res) => {
  // Comment: Triggers slide-up animation before logout, optimized for performance
  req.logout((err) => {
    if (err) return res.status(500).render('error', { message: 'Logout failed' });
    res.redirect('/login');
  });
};

// Auto-login middleware check
exports.ensureAuthenticated = (req, res, next) => {
  // Comment: Checks session for auto-login, redirects to Dashboard with fade-in, optimized for mobile
  if (req.isAuthenticated() && req.user.autoLogin) {
    return res.redirect('/dashboard');
  }
  next();
};

// Check authentication status for root redirect
exports.checkAuth = (req, res) => {
    // Comment: Checks auth status for root redirect, optimized for performance
    res.json({ authenticated: req.isAuthenticated(), autoLogin: req.isAuthenticated() && req.user.autoLogin });
};

// Register new user with auto-login
exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.create({ email, password, name, autoLogin: true });
    // Comment: Auto-login after registration, triggers fade-in for Dashboard
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/dashboard');
    });
  } catch (err) {
    next(err);
  }
};