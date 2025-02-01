const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPremium: { type: Boolean, default: false }, // Track premium users
    subscriptionExpiry: { type: Date }, // Track subscription end date
    
    // Study Streak Tracking
    streak: { type: Number, default: 0 }, // Consecutive study days
    lastStudyDate: { type: String }, // Last date user studied
    
    // Gamification Features
    points: { type: Number, default: 0 }, // User points from flashcards
    level: { type: Number, default: 1 }, // Level up every 100 points
    
    // Flashcards
    customFlashcards: [{
        question: { type: String },
        answer: { type: String }
    }],
    
    // Question History
    questionHistory: [{
        question: { type: String },
        userAnswer: { type: String },
        correctAnswer: { type: String },
        isCorrect: { type: Boolean }
    }],
    
    // Payment Tracking
    paymentHistory: [{
        date: { type: Date, default: Date.now },
        amount: { type: Number },
        method: { type: String }, // PayPal, Credit Card, etc.
        status: { type: String, default: "Completed" }
    }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
