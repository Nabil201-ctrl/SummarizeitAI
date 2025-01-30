// /routes/questionRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
import questionController from '../Controllers/questionController';
=======
const questionController = require('../controllers/questionController');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Route to generate adaptive questions based on difficulty
router.get('/adaptive', questionController.generateAdaptiveQuestions);

// Route to track user's response to a question
router.post('/track-response', questionController.trackResponse);

module.exports = router;
