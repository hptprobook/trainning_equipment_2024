const { addPromptModel } = require('../models/promptModel');

const addPrompt = async (promptData) => {
  await addPromptModel(promptData);
};

module.exports = { addPrompt };