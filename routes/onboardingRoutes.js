// routes/onboardingRoutes.js
const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.get('/', isAuthenticated, onboardingController.getOnboarding);
router.post('/next', isAuthenticated, onboardingController.nextStep);
router.post('/skip', isAuthenticated, onboardingController.skipOnboarding);
router.post('/complete', isAuthenticated, onboardingController.completeOnboarding);

module.exports = router;