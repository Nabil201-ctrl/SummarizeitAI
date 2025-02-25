// server.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const compression = require('express-compression');
const cacheControl = require('express-cache-controller');
const helmet = require('helmet');
const path = require('path');
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session for Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.initialize());
app.use(passport.session());

// Compression and caching for performance
app.use(compression({ level: 6 }));
app.use(cacheControl({ maxAge: 86400 }));

// Secure app
app.use(helmet());

// Serve static assets with CDN
app.use('/public', express.static(path.join(__dirname, 'public'), { maxAge: '1y', etag: true }));

// EJS setup with caching
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', true);

// Middleware for authentication
const { isAuthenticated, ensureAutoLogin } = require('./middleware/auth');

// Routes
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const fileHistoryRoutes = require('./routes/historyRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const deepLearningRoutes = require('./routes/deepLearningRoutes');
const questionRoutes = require('./routes/questionRoutes');
const notesRoutes = require('./routes/notesRoutes');
const summarizedPDFRoutes = require('./routes/summarizedPDFRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const onboardingRoutes = require('./routes/onboardingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Root route with authentication check
app.get('/', (req, res, next) => {
  // Comment: Handles root URL, redirects based on authentication with fade-in animation
  if (req.isAuthenticated() && req.user.autoLogin) {
    return res.redirect('/dashboard'); // Redirect to Dashboard with slide-up animation
  }
  res.redirect('/login'); // Redirect to Login with fade-in animation
});

// Mount routes
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/dashboard', ensureAutoLogin, dashboardRoutes); // Ensure auto-login redirects
app.use('/history', ensureAutoLogin, fileHistoryRoutes);
app.use('/flashcards', ensureAutoLogin, flashcardRoutes);
app.use('/deep-learning', ensureAutoLogin, deepLearningRoutes);
app.use('/questions', ensureAutoLogin, questionRoutes);
app.use('/notes', ensureAutoLogin, notesRoutes);
app.use('/summarized-pdf', ensureAutoLogin, summarizedPDFRoutes);
app.use('/settings', ensureAutoLogin, settingsRoutes);
app.use('/profile', ensureAutoLogin, profileRoutes);
app.use('/analytics', ensureAutoLogin, analyticsRoutes);
app.use('/onboarding', ensureAutoLogin, onboardingRoutes);
app.use('/review', ensureAutoLogin, reviewRoutes);

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Comment: Starts server with performance optimization, animated feedback
  console.log(`Server running on port ${PORT} with mad animations!`);
});