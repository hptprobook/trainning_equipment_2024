import express from 'express';
import { importData, exportData } from '../controllers/excelController';
// import upload from './upload';
import uploadEXCEL from '../uploads/uploadEXCEL';

const router = express.Router();

router.post('/import', uploadEXCEL.single('file'), importData);
router.get('/export', exportData);

export default router;