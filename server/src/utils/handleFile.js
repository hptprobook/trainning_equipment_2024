import mammoth from 'mammoth';
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

export const storageGpt = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/gpt/';

    // Create directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
export const validateDOCX =(filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        mammoth.convertToHtml({ buffer: data })
          .then((result) => {
            resolve(true);
          })
          .catch((err) => {
            resolve(false);
          });
      }
    });
  });
};