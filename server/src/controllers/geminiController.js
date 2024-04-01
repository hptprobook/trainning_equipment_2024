import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { StatusCodes } from 'http-status-codes';
import { messagesService } from '~/services/messagesService';
import { isArray } from 'lodash';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel({ model: 'gemini-pro', safetySettings });
const gemini = async (req, res) => {
  // #swagger.tags = ['gemini']
  // #swagger.summary = ''
  const data = req.body;
  if (req.userId) {
    const idUser = req.userId;
    const listMessages = await messagesService.getMessagesTodayByType(
      String(idUser),
      'gemini'
    );
    if (listMessages.length > 49) {
      console.log({ countMessOfDay: listMessages.length });
      return res.status(StatusCodes.LOCKED).json({
        success: false,
        mgs: 'Limit chat',
      });
    }
  }
  if (!data.content) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Invalid request content',
    });
  } else {
    const dataUser = {
      conversationId: data.conversationId,
      content: data.content,
      type: 'gemini',
      userId: req.userId,
      isUserMessage: true,
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
            ],
          });
          return await chat.sendMessage(prompt);
        } else {
          return await model.generateContent(prompt);
        }
      };
      const response = (await result()).response;
      let dataModel = {
        conversationId: data.conversationId,
        isUserMessage: false,
      };
      try {
        dataModel.content = response.text();
      } catch (error) {
        dataModel.content = "Sorry, I can't anwser this question.";
      }
      await messagesService.addMessages(dataUser);
      await messagesService.addMessages(dataModel);

      res.status(StatusCodes.CREATED).json({
        success: true,
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
