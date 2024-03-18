import { Box } from '@mui/material';
import { useState } from 'react';
import { CompilerLayout } from '~/layout/compiler/CompilerLayout';

const  CompilerPage = () => {
  const [sourceCode, setSourceCode] = useState('');

  const handleRunCode = () => {
    /* eslint-disable-next-line */
    runOnlineCompiler({ language: 'js', code: sourceCode }).then((res) => console.log('Code is runned: ', res));
  };
  return (
    <Box>
      <textarea onChange={(e) => setSourceCode(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
      <button onClick={handleRunCode}>Compile</button>
    </Box>
  );
}

export default CompilerPage;
