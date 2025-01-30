//////////////////// Routes for Gamification ////////////////////

// /routes/gamificationRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
import gamificationController from '../Controllers/gamificationController';
=======
const gamificationController = require('../controllers/gamificationController');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Route to get the leaderboard
router.get('/leaderboard', gamificationController.getLeaderboard);

// Route to update user streaks
router.post('/update-streaks', gamificationController.updateStreaks);

module.exports = router;
