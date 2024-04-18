import multer from 'multer';
import path from 'path';

const fs = require('fs');

export const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });
};

export const storageMp3 = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = 'uploads/mp3/';
  
      // Create directory if it doesn't exist
      fs.mkdirSync(dir, { recursive: true });
  
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });