import express from 'express';
import { geminiController } from '~/controllers/geminiController';
import verifyToken from '../middlewares/verifyToken';

const Router = express.Router();
Router.post('/chat', verifyToken, (req, res) =>
  geminiController.gemini(req, res)
);

export const APIGemini = Router;