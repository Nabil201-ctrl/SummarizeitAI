const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
    const leaderboard = await User.find({ isPremium: true })
        .sort({ "questionHistory.length": -1 })
        .limit(10)
        .select("name questionHistory.length");

    res.render("pages/leaderboard", { leaderboard });
};
