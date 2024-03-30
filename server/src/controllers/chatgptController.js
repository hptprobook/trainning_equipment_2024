import OpenAI from 'openai';

export const chatGptController = async (req, res) => {
  // #swagger.tags = ['chatgpt']
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello!' }],
    });
    res.json(chatCompletion.choices[0].message);
  } catch (error) {
    if (error.status === 429) {
      throw new RateLimitError(
        error.status,
        error,
        error.message,
        error.headers
      );
    } else {
      // handle other types of errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

class RateLimitError extends Error {
  constructor(status, error, message, headers) {
    super(message);
    this.status = status;
    this.error = error;
    this.headers = headers;
  }
}
