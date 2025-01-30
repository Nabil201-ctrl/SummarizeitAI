//////////// AI Route ///////////

import express from 'express';
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/summarize', aiController.summarize);

module.exports = router;
