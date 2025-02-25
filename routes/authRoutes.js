// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.ensureAuthenticated, (req, res) => {
  // Comment: Redirects to Dashboard if auto-login is enabled, otherwise shows login with fade-in
  res.render('login', { user: req.user, error: null });
});

router.post('/login', authController.login);

router.get('/google', authController.googleLogin);

router.get('/google/callback', authController.googleCallback);

router.get('/logout', authController.logout);

router.get('/register', (req, res) => {
  // Comment: Renders registration page with fade-in animation
  res.render('login', { user: req.user, register: true, error: null });
});

router.get('/check', authController.checkAuth); // New route for root auth check

router.post('/register', authController.register);

module.exports = router;