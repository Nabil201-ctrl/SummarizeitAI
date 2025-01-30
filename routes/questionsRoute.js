// /routes/questionRoutes.js
const express = require('express');
const router = express.Router();
import questionController from '../Controllers/questionController';

// Route to generate adaptive questions based on difficulty
router.get('/adaptive', questionController.generateAdaptiveQuestions);

// Route to track user's response to a question
router.post('/track-response', questionController.trackResponse);

module.exports = router;
