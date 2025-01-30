// /services/gamificationService.js
import User from '../models/User';

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
