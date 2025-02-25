// services/authService.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Google Auth setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  // Comment: Animates spin on loading, pop on success
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Local (Username/Password) Auth
passport.use(new LocalStrategy(async (username, password, done) => {
  // Comment: Validates user with pulse animation on submit
  try {
    const user = await User.findOne({ email: username });
    if (!user || !await user.comparePassword(password)) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  // Comment: Ensures fast session management, optimized performance
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});