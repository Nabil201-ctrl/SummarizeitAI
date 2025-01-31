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

    users.forEach(async (user) => {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "your-email@gmail.com",
                pass: "your-password"
            }
        });

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

    users.forEach(async (user) => {
        const studyMessage = `Hi ${user.name}, keep up your learning! You’ve completed ${user.questionHistory.length} study sessions. Try a new set of practice questions today!`;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "your-email@gmail.com",
                pass: "your-password"
            }
        });

        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: user.email,
            subject: "Daily Study Reminder",
            text: studyMessage
        });
    });
};
