// controllers/questionController.js
const User = require('../models/User');

// Get generate questions page
exports.getGenerateQuestions = async (req, res, next) => {
  try {
    // Comment: Fetches user question data, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('questionsGenerated currentQuestions plan questionHistory');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Apply plan limits (20/100/unlimited)
    const limit = user.plan === 'Premium' ? Infinity : user.plan === 'Basic' ? 100 : 20;
    if (user.questionsGenerated >= limit && !user.currentQuestions.length) {
      return res.render('generateQuestions', { user: user, error: 'Question limit reached', activeTab: 'generate' });
    }

    // Comment: Renders with slide-up animation, parallax background
    res.render('generateQuestions', { 
      user: user, 
      title: 'Generate Questions', 
      activeTab: 'generate' 
    });
  } catch (err) {
    next(err);
  }
};

// Generate new questions
exports.generateQuestions = async (req, res, next) => {
  try {
    // Comment: Generates questions with spin animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    const limit = user.plan === 'Premium' ? Infinity : user.plan === 'Basic' ? 100 : 20;
    if (user.questionsGenerated >= limit) {
      return res.status(403).render('generateQuestions', { user: user, error: 'Question limit reached', activeTab: 'generate' });
    }

    const { source, type, category } = req.body;
    const questions = Array.from({ length: 5 }, () => ({
      text: `What is ${source} ${type} question?`,
      type: type || 'short',
      options: type === 'mcq' ? ['Option A', 'Option B', 'Option C', 'Correct'] : [],
      correctAnswer: 'Correct',
      category: category || 'General',
      id: Date.now() + Math.random() // Simplified, use aiService.js
    }));
    user.currentQuestions = questions;
    user.questionsGenerated += questions.length;
    await user.save();
    res.redirect('/questions/generate');
  } catch (err) {
    next(err);
  }
};

// Submit answer for a question
exports.submitAnswer = async (req, res, next) => {
  try {
    // Comment: Submits answer with pop animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const question = user.currentQuestions.find(q => q.id === req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const { answer } = req.body;
    question.feedback = { correct: answer === question.correctAnswer };
    await user.save();
    res.json({ success: true, correct: question.feedback.correct });
  } catch (err) {
    next(err);
  }
};

// Submit all answers for a test
exports.submitAllAnswers = async (req, res, next) => {
  try {
    // Comment: Submits all answers with bounce animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const score = user.currentQuestions.reduce((acc, q) => acc + (q.feedback?.correct ? 1 : 0), 0) / user.currentQuestions.length * 100;
    user.questionHistory.push({
      name: `Test ${new Date().toISOString()}`,
      startDate: new Date(),
      endDate: new Date(),
      score: Math.round(score),
      passed: user.currentQuestions.filter(q => q.feedback?.correct).length,
      total: user.currentQuestions.length,
      category: user.currentQuestions[0]?.category || 'General'
    });
    user.currentQuestions = [];
    await user.save();
    res.json({ success: true, score });
  } catch (err) {
    next(err);
  }
};

// Get question history
exports.getQuestionHistory = async (req, res, next) => {
  try {
    // Comment: Fetches user question history, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('questionHistory plan');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Comment: Renders with slide-in animation, parallax background
    res.render('questionHistory', { user: user, title: 'Question History' });
  } catch (err) {
    next(err);
  }
};

// Delete a test from history
exports.deleteTest = async (req, res, next) => {
  try {
    // Comment: Deletes test with pulse animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.questionHistory = user.questionHistory.filter(t => t.id !== req.params.id);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};