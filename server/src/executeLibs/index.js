import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { escapeRegExp } from '~/utils/formatters';

const executeCommand = async (command, filePath) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      const directoryPath = escapeRegExp(path.dirname(filePath));
      if (error) {
        const cleanedMessage = error.message.replace(new RegExp(directoryPath, 'g'), 'executedFiles');
        reject(new Error(cleanedMessage));
      } else if (stderr) {
        const cleanedStderr = stderr.replace(path.dirname(filePath), '');
        reject(new Error(cleanedStderr));
      } else {
        resolve(stdout);
      }
      fs.unlink(filePath, (unlinkError) => {
        if (unlinkError) reject(new Error(`Unlink error: ${unlinkError.message}\n`));
      });
    });
  });
};

const executePy = (filePath) => {
  return executeCommand(`python "${filePath}"`, filePath);
};

const executeJs = (filePath) => {
  return executeCommand(`node "${filePath}"`, filePath);
};

const executePhp = (filePath) => {
  return executeCommand(`php "${filePath}"`, filePath);
};

const executeCpp = async (filePath) => {
  const executablePath = filePath.replace('.cpp', '');
  await executeCommand(`g++ "${filePath}" -o "${executablePath}"`, filePath, null); // Compile
  return executeCommand(`"${executablePath}"`, executablePath, () => fs.unlink(executablePath, () => {})); // Execute
};

export const executeFile = { executePy, executeJs, executePhp, executeCpp };
