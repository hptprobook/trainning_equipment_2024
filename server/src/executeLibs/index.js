import { exec } from 'child_process';
import fs from 'fs';

const executeCommand = (command, filePath) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Execution error: ${error.message}\n${stderr}`));
      } else if (stderr) {
        reject(new Error(`Runtime error: ${stderr}`));
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

export const executeFile = { executePy, executeJs, executePhp };
