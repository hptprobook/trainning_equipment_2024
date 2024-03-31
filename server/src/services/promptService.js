const { addPromptModel, getPromptsModel } = require('../models/promptModel');

const addPrompt = async (promptData) => {
  await addPromptModel(promptData);
};
const getPrompts = async () => {
  const prompts = await getPromptsModel();
  return prompts;
};
module.exports = { addPrompt, getPrompts };