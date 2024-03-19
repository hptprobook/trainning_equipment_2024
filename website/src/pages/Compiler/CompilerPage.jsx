import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import React, { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { convertLanguage, defaultCode } from '~/utils/formatters';
import { runOnlineCompiler } from '~/APIs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const HEADER_HEIGHT = '48px';
const CONTAINER_HEIGHT = `calc(100% - ${HEADER_HEIGHT})`;

const CompilerPage = () => {
  const [sourceCode, setSourceCode] = useState(defaultCode.javascript);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileOutput, setCompileOutput] = useState('');
  const editorRef = useRef(null); // Ref cho trình soạn thảo
  const monaco = useMonaco();

  /* eslint-disable-next-line no-unused-vars */
  const handleEditorChange = (value, event) => {
    setSourceCode(value);
  };

  // Chuyển đổi ngôn ngữ cho Editor khi selectedLanguage thay đổi
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const model = editor.getModel();

      const position = editor.getPosition();
      const range = editor.getSelection();

      monaco.editor.setModelLanguage(model, selectedLanguage);
      editor.setValue(defaultCode[selectedLanguage]);

      editor.setPosition(position);
      editor.setSelection(range);

      editor.getAction('editor.action.formatDocument').run();
    }
  }, [selectedLanguage, monaco]);

  const handleRunCode = () => {
    const languageForServer = convertLanguage(selectedLanguage);
    setIsCompiling(true);
    runOnlineCompiler({ language: languageForServer, code: sourceCode })
      .then((res) => {
        setCompileOutput(res.output);
      })
      .catch((error) => {
        setCompileOutput('Error running code: ' + error.response.data.error);
      })
      .finally(() => setIsCompiling(false));
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ========== HEADER ========== */}
      <Box
        sx={{
          width: '100%',
          height: HEADER_HEIGHT,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          borderBottom: '1px solid #333',
        }}
      >
        <Typography variant="body1" color="initial">
          SLIF Online Compiler
        </Typography>
        <Link to={'/chat'}>Chat Box </Link>
      </Box>

      {/* ========== CONTAINER ========== */}
      <Box
        sx={{
          width: '100%',
          height: CONTAINER_HEIGHT,
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            xs={7}
            sx={{
              borderRight: '1px solid #333',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: HEADER_HEIGHT,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                borderBottom: '1px solid #333',
              }}
            >
              <Box
                sx={{
                  gap: 2,
                }}
              >
                Language:
                <Button onClick={() => setSelectedLanguage('javascript')}>Js</Button>
                <Button onClick={() => setSelectedLanguage('php')}>PHP</Button>
                <Button onClick={() => setSelectedLanguage('python')}>Py</Button>
                <Button onClick={() => setSelectedLanguage('cpp')}>C++</Button>
              </Box>
              <Box
                sx={{
                  gap: 2,
                }}
              >
                <Button>Save</Button>
                <Button onClick={handleRunCode} disabled={isCompiling}>
                  Run
                </Button>
              </Box>
            </Box>
            <Editor
              height={`calc(100vh - ${HEADER_HEIGHT} - ${HEADER_HEIGHT} )`}
              defaultLanguage={selectedLanguage}
              defaultValue={defaultCode[selectedLanguage]}
              onChange={handleEditorChange}
              onMount={(editor) => (editorRef.current = editor)}
              options={{
                scrollbar: {
                  vertical: 'hidden',
                  verticalScrollbarSize: 0,
                },
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                width: '100%',
                height: HEADER_HEIGHT,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 4,
                borderBottom: '1px solid #333',
                overflowY: 'auto',
              }}
            >
              <Typography>Output</Typography>
              <Box>
                <Button onClick={() => setCompileOutput('')}>Clear</Button>
                <Button>Check AI</Button>
              </Box>
            </Box>
            {isCompiling && <p>Compiling...</p>}
            {compileOutput && (
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                }}
              >
                {compileOutput}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CompilerPage;
