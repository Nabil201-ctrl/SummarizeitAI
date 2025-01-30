// /controllers/aiController.js
const aiService = require('../services/aiService');

// Route to handle AI summarization of PDF content
exports.summarizePdf = async (req, res) => {
    try {
        const summary = await aiService.summarizePdf(req.body.pdf);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ message: 'Error summarizing PDF', error });
    }
};

// Route to generate practice questions based on summarized content
exports.generateQuestions = async (req, res) => {
    try {
        const questions = await aiService.generateQuestions(req.body.content);
        res.json({ questions });
    } catch (error) {
        res.status(500).json({ message: 'Error generating questions', error });
    }
};
