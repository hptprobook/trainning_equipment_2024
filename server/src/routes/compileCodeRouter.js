import express from 'express';
import { compileCodeController } from '~/controllers/compileCodeController';

const Router = express.Router();

Router.get('/run', (req, res) => compileCodeController.compilerCode(req, res));

export const compileCodeRoute = Router;
