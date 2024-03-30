import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { gptController } from '~/controllers/gptController';

const Router = express.Router();
Router.post('/chat', verifyToken, (req, res) =>
  gptController.gpt(req, res)
);

export const APIGpt = Router;