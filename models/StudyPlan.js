////////////////////// Smart Study Plan Schema  ///////////////////

// /models/StudyPlan.js
<<<<<<< HEAD
import mongoose from 'mongoose';
=======
const mongoose = require('mongoose');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

const studyPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examDate: { type: Date, required: true },
    planDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
