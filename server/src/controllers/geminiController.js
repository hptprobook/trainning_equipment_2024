import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { StatusCodes } from 'http-status-codes';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({ model: 'gemini-pro', safetySettings });
const gemini = async (req, res) => {
  const data = req.body;

  if (!data.content) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Invalid request content',
    });
  }
  else {
    const prompt = data.content;
    const history = data?.history;
    try {
      const { totalTokens } = await model.countTokens(prompt);
      const result = async () => {
        if (history) {
          const chat = model.startChat({
            history: [
              {
                role: 'user',
                parts: [{ text: history.user }],
              },
              {
                role: 'model',
                parts: [{ text: history.model }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 100,
            },
          });
          return await chat.sendMessage(prompt);
        }
        else {
          return await model.generateContent(prompt);
        }
      };
      const response = (await result()).response;
      res.status(StatusCodes.CREATED).json({
        success: true,
        user: prompt,
        model: response.text(),
        totalTokens,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        mgs: 'Failed to call the API',
      });
    }
  }

};
// const gemini = async (req, res) => {
//   // const { idConver } = req.params;
//   // const dataMess = await messagesService.getMessagesbyidConver(idConver);
//   return res.status(StatusCodes.OK).json({
//     success: true,
//     api: 'gemini',
//   });
// };
export const geminiController = {
  gemini,
};
