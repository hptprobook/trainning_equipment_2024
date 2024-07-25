import express from 'express';
import { compilerController } from '~/controllers/compilerController';
import verifyToken from '../middlewares/verifyToken';

const Router = express.Router();

Router.get('/codesSaved', verifyToken, compilerController.listCodeSaved)
  .post('/run', verifyToken, compilerController.compilerCode)
  .post('/save', verifyToken, compilerController.saveCode)
  .post('/nextStep', verifyToken, compilerController.chatResponse);

Router.route('/:id')
  .get(verifyToken, compilerController.getDetails)
  .put(verifyToken, compilerController.updateCode)
  .delete(verifyToken, compilerController.deleteCodeSaved);

Router.route('/share/:id').get(verifyToken, compilerController.shareCode);
Router.route('/share/public/:id').get(compilerController.codePublicDetail);

export const compileCodeRoute = Router;
