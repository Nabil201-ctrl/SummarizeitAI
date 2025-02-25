// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.post('/submit', isAuthenticated, reviewController.submitReview);
router.get('/check', isAuthenticated, reviewController.checkReviewPopup);

module.exports = router;