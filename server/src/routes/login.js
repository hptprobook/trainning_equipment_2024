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
Router.post('/updateUserUnPro', verifyToken, (req, res) =>
  userController.updateUserUnPro(req, res)
);
Router.post('/addUserGg', (req, res) => userController.addUserFromGG(req, res));

export const APILogins = Router;
