import express from 'express';
import { compilerController } from '~/controllers/compilerController';
import verifyToken from '../middlewares/verifyToken';

const Router = express.Router();

Router.get('/codesSaved', verifyToken, compilerController.listCodeSaved)
  .post('/run', compilerController.compilerCode)
  .post('/save', verifyToken, compilerController.saveCode);

Router.route('/:id')
  .get(verifyToken, compilerController.getDetails)
  .put(verifyToken, compilerController.updateCode);

Router.route('/share/:id').get(verifyToken, compilerController.shareCode);
Router.route('/share/public/:id').get(
  verifyToken,
  compilerController.codePublicDetail
);

export const compileCodeRoute = Router;
