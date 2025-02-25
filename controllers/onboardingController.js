// controllers/onboardingController.js
const User = require('../models/User');

// Get onboarding page
exports.getOnboarding = async (req, res, next) => {
  try {
    // Comment: Fetches user onboarding data, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('plan onboarded actionCount');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Increment action count for review popup
    user.actionCount = (user.actionCount || 0) + 1;
    await user.save();

    if (user.onboarded) return res.redirect('/dashboard');

    let steps = [];
    const totalSteps = user.plan === 'Premium' ? 7 : user.plan === 'Basic' ? 5 : 3;
    let currentStep = req.session.onboardingStep || 1;

    // Define steps based on plan
    if (user.plan === 'Freemium') {
      steps = [
        { number: 1, title: 'Welcome to [App Name]!', content: 'Upload your notes, PDFs, or books to get started.', action: { type: 'upload', target: 'notes' } },
        { number: 2, title: 'Let’s Summarize!', content: 'Our AI will create concise summaries—try it now!', action: { type: 'generate', target: 'summary' } },
        { number: 3, title: 'Quiz Yourself!', content: 'Generate practice questions to master your material.', action: { type: 'generate', target: 'questions' } }
      ];
    } else if (user.plan === 'Basic') {
      steps = [
        { number: 1, title: 'Welcome to [App Name]!', content: 'Upload your notes.', action: { type: 'upload', target: 'notes' } },
        { number: 2, title: 'Summarize Your Content!', content: 'Generate a summary with AI.', action: { type: 'generate', target: 'summary' } },
        { number: 3, title: 'Test Your Knowledge!', content: 'Generate questions.', action: { type: 'generate', target: 'questions' } },
        { number: 4, title: 'Explore Flashcards!', content: 'Practice with gamified flashcards.', action: { type: 'link', url: '/flashcards', text: 'Flashcards' } },
        { number: 5, title: 'Sync Your Calendar!', content: 'Set study reminders.', action: { type: 'link', url: '/settings', text: 'Settings' } }
      ];
    } else if (user.plan === 'Premium') {
      steps = [
        { number: 1, title: 'Welcome to [App Name]!', content: 'Upload your notes.', action: { type: 'upload', target: 'notes' } },
        { number: 2, title: 'Summarize Your Content!', content: 'Generate a summary.', action: { type: 'generate', target: 'summary' } },
        { number: 3, title: 'Test Your Knowledge!', content: 'Generate questions.', action: { type: 'generate', target: 'questions' } },
        { number: 4, title: 'Master with Flashcards!', content: 'Practice flashcards.', action: { type: 'link', url: '/flashcards', text: 'Flashcards' } },
        { number: 5, title: 'Dive into Deep Learning!', content: 'Use advanced tools.', action: { type: 'link', url: '/deep-learning', text: 'Deep Learning' } },
        { number: 6, title: 'Collaborate with Teams!', content: 'Share with your team.', action: { type: 'link', url: '/team', text: 'Team' } },
        { number: 7, title: 'Personalize Your Experience!', content: 'Customize your theme.', action: { type: 'link', url: '/settings', text: 'Settings' } }
      ];
    }

    // Comment: Renders with slide-in animation, parallax background, triggers review popup
    res.render('onboarding', { 
      user: user, 
      steps: steps, 
      currentStep: currentStep, 
      totalSteps: totalSteps, 
      title: 'Onboarding' 
    });
  } catch (err) {
    next(err);
  }
};

// Next onboarding step
exports.nextStep = async (req, res, next) => {
  try {
    // Comment: Advances step with bounce animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    req.session.onboardingStep = req.body.step || (req.session.onboardingStep || 1) + 1;
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Skip onboarding
exports.skipOnboarding = async (req, res, next) => {
  try {
    // Comment: Skips onboarding with slide-out animation, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.onboarded = true;
    delete req.session.onboardingStep;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Complete onboarding
exports.completeOnboarding = async (req, res, next) => {
  try {
    // Comment: Completes onboarding with confetti animation, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.onboarded = true;
    delete req.session.onboardingStep;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};