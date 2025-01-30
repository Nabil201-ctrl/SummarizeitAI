///////// Payements Route ///////////

import express from 'express';
const router = express.Router();
const authController = require('../Controllers/AuthController');

router.get('/login', authController.login);
router.post('/login', authController.authenticate);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.register);

module.exports = router;
