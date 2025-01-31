const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isPremium: { type: Boolean, default: false },
    premiumExpires: { type: Date, default: null }, // Expiration date for premium users
    questionHistory: [{ text: String, date: Date, numQuestions: Number }], // Store user history
    widgetTheme: { type: String, default: "light" }, // Default widget theme
    aiSettings: { type: Object, default: { difficulty: "medium" } } // AI personalization
});

export default mongoose.model("User", userSchema);
