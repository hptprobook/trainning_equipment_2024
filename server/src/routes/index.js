import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { expController } from '~/controllers/expController';
import { compileCodeRoute } from './compileCodeRouter';
import { APILogins } from './login';
import { APIConversations } from './conversationRouter';
import { APIMessages } from './messageRouter';
import { APIGemini } from './gemini';
import { APIGpt } from './gptRouter';

import excelRouter from './excelRouter';
import promptRouter from './promptRouter';

const Router = express.Router();

Router.get('/status', async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs are ready to use.',
  });
});

Router.route('/test')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get all' });
  })
  .post(expController.addDocument);

Router.use('/compiler', compileCodeRoute);
// api login user
Router.use('/account', APILogins);
// api conversations
Router.use('/conversations', APIConversations);
// api messages
Router.use('/messages', APIMessages);
// api gemini
Router.use('/gemini', APIGemini);
// api excel
Router.use('/excel', excelRouter);
// api prompt
Router.use('/prompt', promptRouter);


Router.use('/gpt', APIGpt);
export const APIs = Router;
