////////////// Authentiation Logic ////////////////

const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Registration Controller
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Login Controller
exports.login = (req, res) => {
  res.render('login');
};

// Authentication Logic
exports.authenticate = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
});
