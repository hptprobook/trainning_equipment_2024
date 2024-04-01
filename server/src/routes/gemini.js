import express from 'express';
import { geminiController } from '~/controllers/geminiController';
import verifyToken from '../middlewares/verifyToken';
import rateLimit from '../middlewares/rateLimit';

const Router = express.Router();
Router.post('/chat', verifyToken, rateLimit, (req, res) =>
  geminiController.gemini(req, res)
);

export const APIGemini = Router;
