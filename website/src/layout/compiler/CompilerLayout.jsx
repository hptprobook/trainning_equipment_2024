import Box from '@mui/material/Box';
import { useState } from 'react';
import { runOnlineCompiler } from '~/APIs';

export const CompilerLayout = () => {
  const [sourceCode, setSourceCode] = useState('');

  const handleRunCode = () => {
    runOnlineCompiler({ language: 'js', code: sourceCode }).then((res) => console.log('Code is runned: ', res));
  };

  return (
    <Box>
      <textarea onChange={(e) => setSourceCode(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
      <button onClick={handleRunCode}>Compile</button>
    </Box>
  );
};
