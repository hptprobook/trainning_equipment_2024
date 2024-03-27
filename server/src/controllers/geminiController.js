import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { StatusCodes } from 'http-status-codes';
import { messagesService } from '~/services/messagesService';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  }
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
    const dataUser = {
      conversationId: data.conversationId,
      content: data.content,
      isUserMessage: true
    };
    const prompt = data.content;
    const history = data?.history || {};
    try {
      // const { totalTokens } = await model.countTokens(prompt);
      const result = async () => {
        if (Object.keys(history).length > 0) {
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
            ]
          });
          return await chat.sendMessage(prompt);
        }
        else {
          return await model.generateContent(prompt, safetySettings);
        }
      };
      const response = (await result()).response;
      // let dataModel = {
      //   conversationId: data.conversationId,
      //   isUserMessage: false
      // };
      // if (response['candidates'] && response['candidates'].length > 0) {
      //   dataModel.content = response.text();
      // }
      // else {
      //   dataModel.content = 'Sorry, I can\'t continue this conversation.';
      // }
      await messagesService.addMessages(dataUser);
      // await messagesService.addMessages(dataModel);

      res.status(StatusCodes.CREATED).json({
        success: true,
        // dataModel,
        response
        // response: response.finishReason()
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        mgs: 'Failed to call the API',
      });
    }
  }

};
export const geminiController = {
  gemini,
};
