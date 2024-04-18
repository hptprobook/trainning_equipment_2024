import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { gptController } from '~/controllers/gptController';
import rateLimit from '../middlewares/rateLimit';
import multer from 'multer';
import { storageMp3 } from '~/utils/handleFile';



const upload = multer({ storage: storageMp3 });

const Router = express.Router();
Router.post('/chat', verifyToken, rateLimit, (req, res) =>
  gptController.gpt(req, res)
);
Router.post('/speech-to-text/:id', upload.single('speech'), (req, res) =>
  gptController.gptSpeechToText(req, res)
);

export const APIGpt = Router;
