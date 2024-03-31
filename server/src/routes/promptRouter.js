const express = require('express');
const router = express.Router();
const { addPrompt, getPrompts } = require('../controllers/promptController');

router.post('/addPrompt', addPrompt);
router.get('/', getPrompts);

module.exports = router;