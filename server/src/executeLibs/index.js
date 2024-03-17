import { exec } from 'child_process';

const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Execution error: ${error.message}\n${stderr}`));
      } else if (stderr) {
        reject(new Error(`Runtime error: ${stderr}`));
      } else {
        resolve(stdout);
      }
    });
  });
};

const executePy = (filePath) => {
  return executeCommand(`python "${filePath}"`);
};

const executeJs = (filePath) => {
  return executeCommand(`node "${filePath}"`);
};

const executePhp = (filePath) => {
  return executeCommand(`php "${filePath}"`);
};

export const executeFile = { executePy, executeJs, executePhp };
