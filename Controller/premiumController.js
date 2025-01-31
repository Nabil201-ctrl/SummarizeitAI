const User = require("../models/User");

exports.getPremiumDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.render("pages/premiumDashboard", {
            user,
            questionHistory: user.questionHistory || [],
            analytics: {
                totalQuestions: user.questionHistory.reduce((sum, q) => sum + q.numQuestions, 0),
                sessions: user.questionHistory.length
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to load premium dashboard." });
    }
};

// Update user settings (widget theme, AI difficulty)
exports.updateSettings = async (req, res) => {
    try {
        const { widgetTheme, aiSettings } = req.body;
        await User.findByIdAndUpdate(req.user.id, { widgetTheme, aiSettings });
        res.json({ success: true, message: "Settings updated!" });
    } catch (error) {
        res.status(500).json({ error: "Error updating settings." });
    }
};
