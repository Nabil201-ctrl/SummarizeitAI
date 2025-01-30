// /controllers/authController.js
<<<<<<< HEAD

//////////////////////////////// User Authentication Logic ////////////////////////////////

import passport from "passport";

=======

//////////////////////////////// User Authentication Logic ////////////////////////////////

const passport = require('passport');

>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9
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
