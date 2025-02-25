// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.get('/generate', isAuthenticated, questionController.getGenerateQuestions);
router.post('/generate', isAuthenticated, questionController.generateQuestions);
router.post('/submit/:id', isAuthenticated, questionController.submitAnswer);
router.post('/submit-all', isAuthenticated, questionController.submitAllAnswers);
router.get('/history', isAuthenticated, questionController.getQuestionHistory);
router.delete('/history/delete/:id', isAuthenticated, questionController.deleteTest);

module.exports = router;