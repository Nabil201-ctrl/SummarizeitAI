// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { isAuthenticated } = require('../middleware/auth');
const multer = require('multer'); // For file uploads

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Protect routes with authentication
router.get('/', isAuthenticated, profileController.getProfile);
router.post('/photo', isAuthenticated, upload.single('photo'), profileController.uploadPhoto);
router.get('/edit', isAuthenticated, (req, res) => {
  // Comment: Renders edit page with bounce animation
  res.render('profile/edit', { user: req.user, title: 'Edit Profile' });
});
router.post('/edit', isAuthenticated, profileController.editProfile);

module.exports = router;