// /controllers/questionController.js
const questionService = require('../services/questionService');

// Route to generate adaptive questions based on user performance
exports.generateAdaptiveQuestions = async (req, res) => {
    try {
        const difficultyLevel = req.user.performanceLevel || 'medium';  // Adaptive difficulty
        const questions = await questionService.generateQuestions(difficultyLevel);
        res.json({ questions });
    } catch (error) {
        res.status(500).json({ message: 'Error generating adaptive questions', error });
    }
};

// Route to track user responses and give feedback
exports.trackResponse = async (req, res) => {
    try {
        const { questionId, userAnswer, correctAnswer } = req.body;
        const result = await questionService.trackUserAnswer(questionId, userAnswer, correctAnswer);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking user response', error });
    }
};
