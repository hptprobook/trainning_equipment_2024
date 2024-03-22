import express from 'express';
import { messagesController } from '../controllers/messagesControler';
import verifyToken from '../middlewares/verifyToken';

const Router = express.Router();

Router.post('/add', verifyToken, (req, res) =>
  messagesController.addMess(req, res)
);
Router.get('/getByIdConver/:idConver', verifyToken, (req, res) =>
  messagesController.getMessagesbyidConver(req, res)
);

export const APIMessages = Router;
