import express from 'express';
import { chatGptController } from '../controllers/chatgptController';

const router = express.Router();

router.post('/chatgpt/chat', chatGptController);

export default router;