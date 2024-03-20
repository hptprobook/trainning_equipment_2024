import express from 'express';
import { conversationsController } from '../controllers/conversationsController';
import verifyToken from '../middlewares/verifyToken';
const Router = express.Router();

Router.post('/add', verifyToken, (req, res) =>
  conversationsController.addConversations(req, res)
);
Router.delete('/delete', verifyToken, (req, res) =>
  conversationsController.delConversations(req, res)
);
Router.patch('/isArchive', verifyToken, (req, res) =>
  conversationsController.converUpdateIsArchive(req, res)
);
Router.patch('/isNotArchive', verifyToken, (req, res) =>
  conversationsController.converUpdateIsNotArchive(req, res)
);
Router.patch('/converUpdateTitle', verifyToken, (req, res) =>
  conversationsController.converUpdateTitle(req, res)
);
Router.get('/getAll', verifyToken, (req, res) =>
  conversationsController.converGetAll(req, res)
);
Router.get('/getAllIsArchive', verifyToken, (req, res) =>
  conversationsController.converGetAllIsArchive(req, res)
);
Router.delete('/delAll', verifyToken, (req, res) =>
  conversationsController.converDelAll(req, res)
);

export const APIConversations = Router;
