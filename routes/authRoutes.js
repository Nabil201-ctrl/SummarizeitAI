// /routes/authRoutes.js
const express = require('express');
const router = express.Router();

const AuthController = require ('../Controllers/AuthController');

// Google Authentication routes
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleCallback);

module.exports = router;