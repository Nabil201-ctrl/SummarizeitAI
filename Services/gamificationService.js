// /services/gamificationService.js
<<<<<<< HEAD
import User from '../models/User';
=======
const User = require('../models/User');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Function to get leaderboard based on user streaks
exports.getLeaderboard = async () => {
    try {
        const leaderboard = await User.find().sort({ streaks: -1 }).limit(10);
        return leaderboard;
    } catch (error) {
        throw new Error('Error fetching leaderboard');
    }
};

// Function to update user streaks
exports.updateStreaks = async (userId) => {
    try {
        const user = await User.findById(userId);
        user.streaks += 1;  // Increment streak by 1
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error updating streaks');
    }
};
