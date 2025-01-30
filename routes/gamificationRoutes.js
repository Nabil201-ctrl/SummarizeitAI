//////////////////// Routes for Gamification ////////////////////

// /routes/gamificationRoutes.js
const express = require('express');
const router = express.Router();
import gamificationController from '../Controllers/gamificationController';

// Route to get the leaderboard
router.get('/leaderboard', gamificationController.getLeaderboard);

// Route to update user streaks
router.post('/update-streaks', gamificationController.updateStreaks);

module.exports = router;
