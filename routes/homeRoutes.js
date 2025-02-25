// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication (optional for public landing)
router.get('/', isAuthenticated, homeController.getHome);

module.exports = router;