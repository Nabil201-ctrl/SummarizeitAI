const User = require("../models/User");
const nodemailer = require("nodemailer");

// Send trial expiration reminders for users
exports.sendTrialReminders = async () => {
    const users = await User.find({ 
        premiumExpires: { 
            $gte: Date.now(), 
            $lte: Date.now() + 3 * 24 * 60 * 60 * 1000 
        } 
    });

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-password"
        }
    });

    users.forEach(async (user) => {
        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: user.email,
            subject: "Your Premium Trial is Expiring Soon!",
            text: `Hi ${user.name}, your premium trial ends on ${user.premiumExpires}. Upgrade now to keep using premium features!`
        });
    });
};

// Send daily study reminders for premium users
exports.sendDailyStudyReminders = async () => {
    const users = await User.find({ isPremium: true });

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-password"
        }
    });

    users.forEach(async (user) => {
        const studyMessage = `Hi ${user.name}, keep up your learning! You’ve completed ${user.questionHistory.length} study sessions. Try a new set of practice questions today!`;

        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: user.email,
            subject: "Daily Study Reminder",
            text: studyMessage
        });
    });
};

// Handle answering flashcards and updating user points and levels
exports.answerFlashcard = async (req, res) => {
    try {
        const { isCorrect } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        if (isCorrect) {
            user.points += 10; // Add 10 points for correct answers
        }

        user.level = Math.floor(user.points / 100); // Every 100 points = new level
        await user.save();

        res.json({ points: user.points, level: user.level });
    } catch (error) {
        res.status(500).json({ error: "Error updating flashcard answer" });
    }
};