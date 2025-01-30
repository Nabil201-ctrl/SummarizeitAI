// /controllers/authController.js

//////////////////////////////// User Authentication Logic ////////////////////////////////

import passport from "passport";

// Google Authentication route
exports.googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});

// Google Authentication Callback
exports.googleCallback = passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard'
});

// Local login & registration logic can go here if needed
