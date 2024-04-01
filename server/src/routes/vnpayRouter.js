import express from 'express';
import { vnpayController } from '../controllers/vnpayController';
import verifyToken from '../middlewares/verifyToken';
import rateLimit from '../middlewares/rateLimit';

const Router = express.Router();

Router.post('/create_payment_url', verifyToken, (req, res) =>
  vnpayController.create_payment_url(req, res)
);

Router.get('/vnpay_return', verifyToken, rateLimit, (req, res) =>
  vnpayController.vnpay_return(req, res)
);
export const APIvnpay = Router;
