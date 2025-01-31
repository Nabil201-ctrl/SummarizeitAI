const User = require("../models/User");

exports.updateStreak = async (req, res) => {
    const user = await User.findById(req.user.id);
    const today = new Date().toDateString();

    if (user.lastStudyDate !== today) {
        if (new Date(user.lastStudyDate).getTime() + 86400000 === new Date(today).getTime()) {
            user.streak += 1;
        } else {
            user.streak = 1; // Reset if they miss a day
        }

        user.lastStudyDate = today;
        await user.save();
    }

    res.json({ streak: user.streak });
};
