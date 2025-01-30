///////////////////// Leaderboards, Streaks, Rewards //////////////////////

// /controllers/gamificationController.js
const gamificationService = require('../services/gamificationService');

// Route to get the leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await gamificationService.getLeaderboard();
        res.json({ leaderboard });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};

// Route to update user streaks after activity
exports.updateStreaks = async (req, res) => {
    try {
        const user = await gamificationService.updateStreaks(req.user.id);
        res.json({ streaks: user.streaks });
    } catch (error) {
        res.status(500).json({ message: 'Error updating streaks', error });
    }
};
