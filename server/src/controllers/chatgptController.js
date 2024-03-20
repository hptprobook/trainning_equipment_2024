import OpenAI from 'openai';

export const chatGptController = async (req, res) => {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  const chatCompletion = await openai.createCompletion({
    engine: "text-davinci-002",
    prompt: req.body.content,
    max_tokens: 60
  });

  res.json(chatCompletion);
};