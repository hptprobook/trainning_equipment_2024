import { StatusCodes } from 'http-status-codes';

import OpenAI from 'openai';
import Configuration from 'openai';
import { messagesService } from '~/services/messagesService';
const configuration = new Configuration({
  // organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);
const gpt = async (req, res) => {
  const data = req.body;
  if (req.userId) {
    const idUser = req.userId;
    const listMessages = await messagesService.getMessagesTodayByType(
      String(idUser),
      'chat4'
    );
    if (listMessages.length > 20) {
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
      isUserMessage: true,
      type: 'chat4',
      userId: req.userId,
    };
    const history = data?.history || {};
    try {
      let systemHistory = [];
      if (Object.keys(history).length > 0) {
        systemHistory = [
          {
            role: 'user',
            content: history.user,
          },
          {
            role: 'assistant',
            content: history.model,
          },
          { role: 'user', content: data.content },
        ];
      } else {
        systemHistory = [{ role: 'user', content: data.content }];
      }
      const completion = await openai.chat.completions.create({
        messages: systemHistory,
        model: data.model,
        // max_tokens: 100,
      });
      let dataModel = {
        conversationId: data.conversationId,
        content: completion.choices[0].message.content,
        isUserMessage: false,
      };
      await messagesService.addMessages(dataUser);
      await messagesService.addMessages(dataModel);

      res.status(StatusCodes.CREATED).json({
        success: true,
        content: completion.choices[0].message.content,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        mgs: 'Failed to call the API',
      });
    }
  }
};
export const gptController = {
  gpt,
};
