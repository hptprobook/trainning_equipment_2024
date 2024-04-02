/* eslint-disable indent */
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { escapeRegExp } from '~/utils/formatters';

const dirCodes = path.join(__dirname, '../executedFiles');

const executeCommandDocker = async (language, filePath) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const volumeMount = `${dirCodes}:/app`;
    let dockerImage;

    switch (language) {
      case 'python':
        dockerImage = 'sli2024/python';
        break;
      case 'node':
        dockerImage = 'sli2024/node';
        break;
      case 'php':
        dockerImage = 'sli2024/php';
        break;
      default:
        return reject(new Error('Unsupported language'));
    }

    const command = `docker run --rm -v "${volumeMount}" ${dockerImage} ${language} "/app/${fileName}"`;
    const directoryPath = escapeRegExp(path.dirname(filePath));

    exec(command, (error, stdout, stderr) => {
      if (error) {
        const cleanedMessage = error.message.replace(
          new RegExp(directoryPath, 'g'),
          'executedFiles'
        );
        reject(new Error(cleanedMessage));
      } else if (stderr) {
        const cleanedStderr = stderr.replace(path.dirname(filePath), '');
        reject(new Error(cleanedStderr));
      } else {
        resolve(stdout);
      }
    });
  }).finally(() => {
    fs.unlink(filePath, (unlinkError) => {
      if (unlinkError)
        // eslint-disable-next-line no-console
        console.log(`Error deleting file: ${unlinkError.message}`);
    });
  });
};

const executePy = (filePath) => {
  return executeCommandDocker('python', filePath);
};

const executeJs = (filePath) => {
  return executeCommandDocker('node', filePath);
};

const executePhp = (filePath) => {
  return executeCommandDocker('php', filePath);
};

export const executeFile = { executePy, executeJs, executePhp };
