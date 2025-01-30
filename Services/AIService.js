// /services/aiService.js
<<<<<<< HEAD
import openai from 'openai'; // Example using OpenAI API for summarization and question generation
=======
const openai = require('openai'); // Example using OpenAI API for summarization and question generation
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// AI function for PDF summarization
exports.summarizePDF = async (pdfContent) => {
    try {
        // Use OpenAI's GPT or similar model to summarize the content
        const summary = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: `Summarize the following text: ${pdfContent}`,
            max_tokens: 1000
        });
        return summary.choices[0].text;
    } catch (error) {
        throw new Error('Error summarizing PDF');
    }
};

// AI function to generate practice questions
exports.generateQuestions = async (summary) => {
    try {
        // Use OpenAI to generate questions from the summary
        const questions = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: `Generate practice questions based on this summary: ${summary}`,
            max_tokens: 500
        });
        return questions.choices[0].text.split('\n');
    } catch (error) {
        throw new Error('Error generating questions');
    }
};
