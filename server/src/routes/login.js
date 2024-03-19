import express from 'express';
import { userController } from '../controllers/usersController';
const Router = express.Router();

Router.get('/getAccessTokenGit', (req, res) =>
  userController.getAccessTokenGit(req, res)
);
Router.get('/getUserGit', (req, res) => userController.getUserGit(req, res));
Router.post('/addUser', (req, res) => userController.addUser(req, res));
Router.delete('/logout', (req, res) => userController.logOut(req, res));

export const APILogins = Router;
