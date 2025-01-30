// /controllers/aiController.js
<<<<<<< HEAD
import aiService  from '../Services/AIService';
=======
const aiService = require('../services/aiService');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Route to handle AI summarization of PDF content
exports.summarizePdf = async (req, res) => {
    try {
<<<<<<< HEAD
        const summary = await aiService.summarizePDF(req.body.pdf);
=======
        const summary = await aiService.summarizePdf(req.body.pdf);
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9
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
