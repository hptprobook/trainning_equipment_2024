const { StatusCodes } = require('http-status-codes');
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
const getPrompts = async (req, res) => {
  try {
    const prompts = await promptService.getPrompts();
    let useCase = [];
    let category = [];
    prompts.forEach((prompt) => {
      useCase.push(prompt.use_case);
      category.push(prompt.category);
    });
    useCase = [...new Set(useCase)];
    category = [...new Set(category)];
    useCase = useCase.map((item) => {
      return { value: item, name: item };
    });
    category = category.map((item) => {
      return { value: item, name: item };
    });
    res.status(StatusCodes.CREATED).json({
      prompts,
      useCase,
      category
    });
  } catch (error) {
    res.status(500).send('Error from nodejs: ' + error.message);
  }
};

module.exports = { addPrompt, getPrompts };
