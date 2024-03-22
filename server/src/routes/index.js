import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { expController } from '~/controllers/expController';
import { compileCodeRoute } from './compileCodeRouter';
import { APILogins } from './login';
import { APIConversations } from './conversationRouter';
import { APIMessages } from './messageRouter';
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

/* Compile Code APIs */
Router.use('/compile', compileCodeRoute);
// api login user
Router.use('/account', APILogins);
// api conversations
Router.use('/conversations', APIConversations);
// api messages
Router.use('/messages', APIMessages);

export const APIs = Router;
