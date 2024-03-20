import express from 'express';
import { compilerController } from '~/controllers/compilerController';
import verifyToken from '../middlewares/verifyToken';

const Router = express.Router();

Router.get('/codesSaved', verifyToken, compilerController.listCodeSaved)
  .post('/run', compilerController.compilerCode)
  .post('/save', verifyToken, compilerController.saveCode);

Router.route('/:id').get(verifyToken, compilerController.getDetails);
Router.route('/share/:id').put(verifyToken, compilerController.shareCode);

export const compileCodeRoute = Router;
