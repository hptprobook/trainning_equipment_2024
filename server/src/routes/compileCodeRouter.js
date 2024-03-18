import express from 'express';
import { compileCodeController } from '~/controllers/compileCodeController';

const Router = express.Router();

Router.post('/run', (req, res) => compileCodeController.compilerCode(req, res));

export const compileCodeRoute = Router;
