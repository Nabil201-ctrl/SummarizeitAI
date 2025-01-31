const AIService = require("../Services/AIService"); // AI Logic (e.g., OpenAI API)
const PDFProcessor = require("../Services/pdfService");

// Summarize Text/PDF
exports.summarizeText = async (req, res) => {
    try {
        let { text, pdfUrl } = req.body;

        // If a PDF URL is provided, extract text
        if (pdfUrl) {
            text = await PDFProcessor.extractTextFromPDF(pdfUrl);
        }

        if (!text) {
            return res.status(400).json({ error: "No valid text provided." });
        }

        const summary = await AIService.generateSummary(text);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: "Failed to summarize text." });
    }
};

// Generate Practice Questions with User Limits
exports.generateQuestions = async (req, res) => {
    try {
        const { text, numQuestions } = req.body;
        const user = req.user;

        if (!text) return res.status(400).json({ error: "Text required" });

        let questionCount = user.isPremium ? numQuestions || 10 : 10; // Limit basic users to 10
        if (questionCount > 50) questionCount = 50; // Set a max limit

        const questions = await AIService.generateQuestions(text, questionCount);
        res.json({ questions });
    } catch (error) {
        res.status(500).json({ error: "Error generating questions." });
    }
};
