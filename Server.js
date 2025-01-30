////////////////////////////
// Entry point for the server
////////////////////////////

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const passport = require('passport');
const mongoose = require('./Config/db');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const aiRoutes = require('./routes/aiRoutes');
const questionRoutes = require('./routes/questionRoutes'); // Example of another route requiring auth
const cookieParser = require("cookie-parser");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const authMiddleware = require("./middleware/authMiddleware"); // JWT auth middleware
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware); // Enable sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/payment', paymentRoutes);
app.use('/ai', aiRoutes);

// Protected Routes (Require authentication)
app.use('/questions', authMiddleware, questionRoutes); // Example: Secure question routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
