import express from 'express';
import { userController } from '../controllers/usersController';
import verifyToken from '../middlewares/verifyToken';
const Router = express.Router();

Router.get('/getTokenUser', (req, res) =>
  userController.getAccessTokenGit(req, res)
);
Router.get('/getUser', verifyToken, (req, res) =>
  userController.getUser(req, res)
);

export const APILogins = Router;
