import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import OpenAI from 'openai';
import Configuration from 'openai';
import { messagesService } from '~/services/messagesService';
import { removeFile } from '~/utils/handleFile';
import { conversationsModal } from '~/models/conversationModal';
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
        messsage: 'Limit chat',
      });
    }
  }
  if (!data.content) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid request content',
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
        messsage: 'Failed to call the API',
      });
    }
  }
};

const gptResponse = async (content) => {
  if (!content) {
    throw new Error('Invalid request content');
  }

  try {
    const systemHistory = [{ role: 'user', content }];
    const completion = await openai.chat.completions.create({
      messages: systemHistory,
      model: 'gpt-4',
    });

    return { success: true, content: completion.choices[0].message.content };
  } catch (error) {
    return { success: false, message: 'Failed to call the API' };
  }
};
const gptSpeechToText = async (req, res) => {

  try {
    const file = req.file;
    const { id } = req.params;
    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid request content',
      });
    }
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(file.path),
      model: 'whisper-1',
    });
    removeFile(file.path);

    if (transcription.text === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid request content',
      });
    }
    else {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: transcription.text }],
        model: 'gpt-3.5-turbo',
      });
      let dataUser = {
        conversationId: id,
        content: transcription.text,
        isUserMessage: true,
        userId: req.userId,
      };
      let dataModel = {
        conversationId: id,
        content: completion.choices[0].message.content,
        isUserMessage: false,
        type: 'chat4',
      };
      await messagesService.addMessages(dataUser);
      await messagesService.addMessages(dataModel);
      res.status(StatusCodes.CREATED).json({
        success: true,
        content: completion.choices[0].message.content,
        text: transcription.text,
      });
    }
  }
  catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to call the API',
    });

  }
};
export const gptController = {
  gpt,
  gptResponse,
  gptSpeechToText
};
