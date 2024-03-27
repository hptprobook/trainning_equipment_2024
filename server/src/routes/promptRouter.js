const express = require('express');
const router = express.Router();
const { addPrompt } = require('../controllers/promptController');

router.post('/addPrompt', addPrompt);

module.exports = router;