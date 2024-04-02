import { GET_DB } from '~/config/mongodb';
import Joi from 'joi';

const SAVE_PROMPT_SCHEMA = Joi.object({
  category: Joi.string().required(),
  prompt_hint: Joi.string().optional(),
  prompt_template: Joi.string().required(),
  prompt_title: Joi.string().required(),
  teaser: Joi.string().optional(),
  use_case: Joi.string().required(),
  variables: Joi.array().items(Joi.object().unknown(true)),
  variable_types: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ),
});

const validateBeforeCreate = async (data) => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  return await SAVE_PROMPT_SCHEMA.validateAsync(data, { abortEarly: false });
};

const addPromptModel = async (dataPrompt) => {
  // Check if dataPrompt is an array
  if (!Array.isArray(dataPrompt)) {
    throw new Error('Data must be an array');
  }

  // Get a reference to the MongoDB database
  const db = GET_DB();
  const promptsCollection = db.collection('prompts');

  // Validate each object in the array and save it to the database
  for (const item of dataPrompt) {
    const validData = await validateBeforeCreate(item);

    await promptsCollection.insertOne(validData);
  }
};
const getPromptsModel = async () => {
  const db = GET_DB();
  const promptsCollection = db.collection('prompts');
  const prompts = await promptsCollection.find().toArray();
  return prompts;
};
export { addPromptModel, getPromptsModel };
