import express from 'express';
import { StatusCodes } from 'http-status-codes';

const Router = express.Router();

Router.get('/status', async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs are ready to use.',
  });
});
export const APIs = Router;
