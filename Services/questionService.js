// /services/questionService.js
const Question = require('../models/Question');

// Function to generate adaptive questions based on difficulty
exports.generateQuestions = async (difficulty) => {
    try {
        const questions = await Question.find({ difficulty: difficulty });
        return questions;
    } catch (error) {
        throw new Error('Error fetching questions');
    }
};

// Function to track user's answers and adjust their performance
exports.trackUserAnswer = async (questionId, userAnswer, correctAnswer) => {
    try {
        const question = await Question.findById(questionId);
        const isCorrect = userAnswer === correctAnswer;
        
        if (isCorrect) {
            // Increase performance level if correct
            question.userPerformance += 1;
        } else {
            // Decrease performance level if wrong
            question.userPerformance -= 1;
        }

        await question.save();
        return { isCorrect, updatedPerformance: question.userPerformance };
    } catch (error) {
        throw new Error('Error tracking answer');
    }
};
