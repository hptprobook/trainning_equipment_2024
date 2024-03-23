import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { convertLanguage, defaultCode } from '~/utils/formatters';
import { runOnlineCompiler } from '~/APIs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveCode } from '~/redux/slices/compilerSlice';
import useAuth from '~/customHooks/useAuth';
import DialogSimple from '~/component/Dialog/DialogSimple';
import ResponsiveBox from '~/component/ResponsiveBox/ResponsiveBox';
import CompilerOutput from '~/layout/compiler/CompilerOutput';
import CompilerHeader from '~/layout/compiler/CompilerHeader';
import EditorAction from '~/layout/compiler/EditorAction';
import FormDialog from '~/component/Dialog/DialogWithForm';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const HEADER_HEIGHT = '56px';
const CONTAINER_HEIGHT = `calc(100% - ${HEADER_HEIGHT})`;

const CompilerPage = () => {
  const monaco = useMonaco();
  const editorRef = useRef(null); // Ref cho trình soạn thảo
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sourceCode, setSourceCode] = useState(defaultCode.javascript);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [title, setTitle] = useState('Code Snippet');
  const [openCodeTitleForm, setOpenCodeTitleForm] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileOutput, setCompileOutput] = useState('');
  const [theme, setTheme] = useState('light');
  const [editorFontSize, setEditorFontSize] = useState(15);
  // const { data, status, error } = useSelector((state) => state.compiler);
  const [openDialogNotAuth, setOpenDialogNotAuth] = useState(false);
  const isAuth = useAuth();

  const handleCheckAI = () => {
    navigate('/chat', { state: { sourceCode } });
  };

  const handleEditorChange = (value) => {
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
    setTitle(title);
    if (!isAuth) {
      setOpenDialogNotAuth(true);
    } else {
      setOpenCodeTitleForm(true);
    }
  };

  const handleSaveCodeWithTitle = (title) => {
    const languageForServer = convertLanguage(selectedLanguage);
    dispatch(saveCode({ language: languageForServer, code: sourceCode, title }))
      .then(() => {
        toast.success('Code saved successfully', { autoClose: 1000 });
      })
      .catch(() => {
        toast.error('Error saving code', { autoClose: 1000 });
      });
    setOpenDialogNotAuth(false);
  };

  return (
    <>
      <ResponsiveBox />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: {
            xs: 'none',
            md: 'none',
            lg: 'block',
          },
        }}
      >
        {/* ========== HEADER ========== */}
        <DialogSimple
          description={'You need to log in to be able to save the code'}
          title={'You are not logged in!'}
          open={openDialogNotAuth}
          setOpen={setOpenDialogNotAuth}
        />
        <Dialog
          open={openCodeTitleForm}
          onClose={() => setOpenCodeTitleForm(false)}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              handleSaveCodeWithTitle(event.target.title.value);
              setOpenCodeTitleForm(false);
            },
          }}
        >
          <DialogTitle>Title of code snippet</DialogTitle>
          <DialogContent>
            <DialogContentText>What is the title of this code snippet ?</DialogContentText>
            <TextField autoFocus required margin="dense" id="title" name="title" label="Title" type="text" fullWidth variant="standard" />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCodeTitleForm(false)}>Cancel</Button>
            <Button type="submit">SUBMIT</Button>
          </DialogActions>
        </Dialog>
        <CompilerHeader height={HEADER_HEIGHT} theme={theme} />

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
              xs={12}
              md={12}
              lg={7}
              sx={{
                borderRight: '1px solid #c9c6c6',
              }}
            >
              <EditorAction
                handleCopyCode={handleCopyCode}
                handleRunCode={handleRunCode}
                handleSaveCode={handleSaveCode}
                height={HEADER_HEIGHT}
                isCompiling={isCompiling}
                selectedLanguage={selectedLanguage}
                setEditorFontSize={setEditorFontSize}
                setSelectedLanguage={setSelectedLanguage}
                setTheme={setTheme}
                theme={theme}
              />
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
            <Grid item xs={12} md={12} lg={5}>
              <CompilerOutput
                compileOutput={compileOutput}
                handleCheckAI={handleCheckAI}
                height={HEADER_HEIGHT}
                isCompiling={isCompiling}
                setCompileOutput={setCompileOutput}
                theme={theme}
                isAuth={isAuth}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CompilerPage;
