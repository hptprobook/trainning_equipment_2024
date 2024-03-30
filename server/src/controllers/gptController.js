import { StatusCodes } from 'http-status-codes';

import OpenAI from 'openai';
import Configuration from 'openai';
const configuration = new Configuration({
  // organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);
const gpt = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.',
        },
        { role: 'user', content: 'Who won the world series in 2020?' },
      ],
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: 'json_object' },
    });
    res.json({ rs: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error });
    // if (error.status === 429) {
    //     res.status(StatusCodes.TOO_MANY_REQUESTS).json({ error });
    //     // throw new RateLimitError(
    //     //     error.status,
    //     //     error,
    //     //     error.message,
    //     //     error.headers
    //     // );
    // } else {
    //     // handle other types of errors
    //     res.status(500).json({ error: 'An error occurred' });
    // }
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
export const gptController = {
  gpt,
};