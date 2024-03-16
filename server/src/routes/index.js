import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { expController } from '~/controllers/expController';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs are ready to use.',
  });
});

Router.route('/test')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get all' });
  })
  .post(expController.addDocument);

export const APIs = Router;
