// /models/Question.js
<<<<<<< HEAD
import mongoose from 'mongoose';
=======
const mongoose = require('mongoose');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

const questionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    userPerformance: { type: Number, default: 0 } // Tracks user performance for adaptive learning
});

module.exports = mongoose.model('Question', questionSchema);
