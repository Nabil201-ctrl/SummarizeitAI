// /routes/authRoutes.js
import express from 'express'; 
const router = express.Router();

// /routes/authRoutes.js
import { googleAuth, googleCallback } from '../Controller/AuthController.js'; // Adjusted for ES Modules

// Google Authentication routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

export default router;
