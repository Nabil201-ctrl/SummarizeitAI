// /routes/authRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD

const AuthController = require ('../Controllers/AuthController');

// Google Authentication routes
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleCallback);
=======
const authController = require('../controllers/authController');

// Google Authentication routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

module.exports = router;
