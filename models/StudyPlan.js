////////////////////// Smart Study Plan Schema  ///////////////////

// /models/StudyPlan.js
const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examDate: { type: Date, required: true },
    planDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
