const promptService = require('../services/promptService');

const addPrompt = async (req, res) => {
  // #swagger.tags = ['prompt']
  // #swagger.summary = ''
  try {
    await promptService.addPrompt(req.body);
    res.send('Prompt added successfully');
  } catch (error) {
    res.status(500).send('Error from nodejs: ' + error.message);
  }
};

module.exports = { addPrompt };
