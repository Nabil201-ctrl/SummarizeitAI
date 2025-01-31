// /controllers/authController.js

//////////////////////////////// User Authentication Logic ////////////////////////////////

import passport from "passport";

// Google authentication route handler
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Google Authentication Callback
export const googleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/dashboard'
});

