import express from 'express';
import { conversationsController } from '../controllers/conversationsController';
const Router = express.Router();
Router.get('/add', (req, res) =>
  conversationsController.addConversations(req, res)
);
export const APIConversations = Router;
