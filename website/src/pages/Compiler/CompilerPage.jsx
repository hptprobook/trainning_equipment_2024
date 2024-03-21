import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { convertLanguage, defaultCode } from '~/utils/formatters';
import { runOnlineCompiler } from '~/APIs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveCode } from '~/redux/slices/compilerSlice';

const HEADER_HEIGHT = '56px';
const CONTAINER_HEIGHT = `calc(100% - ${HEADER_HEIGHT})`;

const CompilerPage = () => {
  const monaco = useMonaco();
  const editorRef = useRef(null); // Ref cho trình soạn thảo
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sourceCode, setSourceCode] = useState(defaultCode.javascript);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileOutput, setCompileOutput] = useState('');
  const [theme, setTheme] = useState('light');
  const [editorFontSize, setEditorFontSize] = useState(15);
  const { data, status, error } = useSelector((state) => state.compiler);

  const handleCheckAI = () => {
    navigate('/chat', { state: { sourceCode } });
  };

  /* eslint-disable-next-line no-unused-vars */
  const handleEditorChange = (value, event) => {
    setSourceCode(value);
  };

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
      monaco.editor.setTheme(theme === 'light' ? 'vs' : 'vs-dark');
    }
  }, [selectedLanguage, monaco, theme]);

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

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      // Kiểm tra xem API clipboard có sẵn không
      navigator.clipboard
        .writeText(sourceCode)
        .then(() => {
          toast.success('Copied!', {
            autoClose: 500,
          });
        })
        .catch((err) => {
          alert('Failed to copy code: ', err);
        });
    } else {
      alert('Clipboard API not available.');
    }
  };

  const handleSaveCode = () => {
    const languageForServer = convertLanguage(selectedLanguage);
    dispatch(saveCode({ language: languageForServer, code: sourceCode }))
      .then(() => {
        toast.success('Code saved successfully', { autoClose: 1000 });
      })
      .catch(() => {
        toast.error('Error saving code', { autoClose: 1000 });
      });
  };

  console.log(status);
  console.log(error);
  console.log(data);

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
          bgcolor: theme === 'light' ? '#eeeeee' : '#424242',
        }}
      >
        <Typography variant="body1" color={theme === 'light' ? 'inherit' : '#fff'}>
          SLIF Online Compiler
        </Typography>
        <Link
          to={'/chat'}
          style={{
            color: theme === 'light' ? '#333' : '#fff',
          }}
        >
          Chat Box{' '}
        </Link>
      </Box>

      {/* ========== CONTAINER ========== */}
      <Box
        sx={{
          width: '100%',
          height: CONTAINER_HEIGHT,
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            bgcolor: theme === 'light' ? 'fff' : '#1e1e1e',
          }}
        >
          <Grid
            item
            xs={7}
            sx={{
              borderRight: '1px solid #c9c6c6',
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
                borderBottom: '1px solid #c9c6c6',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setSelectedLanguage('javascript')}
                >
                  <img
                    width={30}
                    style={{
                      border: selectedLanguage === 'javascript' ? '2px solid #ba000d' : 'none',
                    }}
                    height={30}
                    alt="JavaScript"
                    src={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Javascript_badge.svg/946px-Javascript_badge.svg.png'}
                  />
                </Box>
                <Box
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setSelectedLanguage('python')}
                >
                  <img
                    style={{
                      border: selectedLanguage === 'python' ? '2px solid #ba000d' : 'none',
                    }}
                    width={30}
                    height={30}
                    alt="Python"
                    src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/640px-Python.svg.png'}
                  />
                </Box>
                <Box
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setSelectedLanguage('cpp')}
                >
                  <img
                    style={{
                      border: selectedLanguage === 'cpp' ? '2px solid #ba000d' : 'none',
                    }}
                    width={30}
                    height={30}
                    alt="C++"
                    src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png'}
                  />
                </Box>
                <Box
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setSelectedLanguage('php')}
                >
                  <img
                    style={{
                      border: selectedLanguage === 'php' ? '2px solid #ba000d' : 'none',
                    }}
                    width={30}
                    height={30}
                    alt="PHP"
                    src={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/800px-PHP-logo.svg.png'}
                  />
                </Box>
              </Box>
              <Box sx={{ width: 150 }}>
                <Slider
                  defaultValue={15}
                  onChange={(e) => setEditorFontSize(e.target.value)}
                  valueLabelDisplay="auto"
                  shiftStep={3}
                  step={1}
                  marks
                  min={13}
                  max={25}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Button variant="contained" size="small" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                  {theme === 'light' ? 'dark' : 'light'}
                </Button>
                <Button onClick={handleCopyCode} variant="contained" size="small">
                  Copy
                </Button>
                <Button onClick={handleSaveCode} variant="contained" size="small">
                  Save
                </Button>
                <Button variant="contained" size="small" onClick={handleRunCode} disabled={isCompiling}>
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
                fontSize: editorFontSize,
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
                borderBottom: '1px solid #c9c6c6',
                overflowY: 'auto',
                bgcolor: theme === 'light' ? 'fff' : '#1e1e1e',
              }}
            >
              <Typography color={theme === 'light' ? 'inherit' : '#fff'}>Output</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Button size="small" variant="contained" onClick={() => setCompileOutput('')}>
                  Clear
                </Button>
                <Button onClick={handleCheckAI} size="small" variant="contained">
                  Check AI
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                px: 4,
                py: 2,
              }}
            >
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CompilerPage;
