// /models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    userPerformance: { type: Number, default: 0 } // Tracks user performance for adaptive learning
});

module.exports = mongoose.model('Question', questionSchema);
