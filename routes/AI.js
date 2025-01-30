import express from 'express';
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/summarize', aiController.summarize);
router.post('/generate-questions', aiController.generateQuestions); // Allow users to generate a set number of questions
router.post('/submit-answer', aiController.submitAnswer); // Track user responses & adjust difficulty
router.post('/set-exam-date', aiController.setExamDate); // Smart study planner - set exam date
router.post('/annotate-pdf', aiController.annotatePDF); // Interactive PDF markup
router.post('/analyze-speech', aiController.analyzeSpeech); // AI-powered voice input analysis

module.exports = router;
