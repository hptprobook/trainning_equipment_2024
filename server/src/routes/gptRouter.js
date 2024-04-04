import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { gptController } from '~/controllers/gptController';
import rateLimit from '../middlewares/rateLimit';
const Router = express.Router();
Router.post('/chat', verifyToken, rateLimit, (req, res) =>
  gptController.gpt(req, res)
);

export const APIGpt = Router;
