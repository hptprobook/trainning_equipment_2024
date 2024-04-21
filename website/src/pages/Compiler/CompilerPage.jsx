import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { convertLanguage, defaultCode } from '~/utils/formatters';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { codesSaved, saveCode } from '~/redux/slices/compilerSlice';
import useAuth from '~/customHooks/useAuth';
import DialogSimple from '~/component/Dialog/DialogSimple';
import ResponsiveBox from '~/component/ResponsiveBox/ResponsiveBox';
import CompilerOutput from '~/layout/compiler/CompilerOutput';
import CompilerHeader from '~/layout/compiler/CompilerHeader';
import EditorAction from '~/layout/compiler/EditorAction';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularLoading from '~/component/Loading/CircularLoading';
import useCompiler from '~/customHooks/useCompiler';
import { Helmet } from 'react-helmet-async';

const HEADER_HEIGHT = '56px';
const CONTAINER_HEIGHT = `calc(100% - ${HEADER_HEIGHT})`;

const CompilerPage = () => {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const [title, setTitle] = useState('Code Snippet');
  const [openCodeTitleForm, setOpenCodeTitleForm] = useState(false);
  const [theme, setTheme] = useState('light');
  const [editorFontSize, setEditorFontSize] = useState(15);
  const codesSavedData = useSelector((state) => state.compiler.codesSavedData);
  const [openDialogNotAuth, setOpenDialogNotAuth] = useState(false);
  const [openList, setOpenList] = useState(false);

  const {
    sourceCode,
    setSourceCode,
    selectedLanguage,
    setSelectedLanguage,
    compileOutput,
    setCompileOutput,
    gptResponseError,
    setGptResponseError,
    gptResponseRefactor,
    setGptResponseRefactor,
    handleRunCode,
    handleCopyCode,
    handleShowRefactor,
  } = useCompiler();

  const { nextStepData, isRunCodeLoading } = useSelector(
    (state) => state.compiler
  );

  useEffect(() => {
    dispatch(codesSaved());
  }, [dispatch]);

  const handleCheckAI = () => {
    navigate('/chat', { state: { sourceCode } });
  };

  const handleEditorChange = (value) => {
    setSourceCode(value);
  };

  useEffect(() => {
    if (editorRef.current && monaco) {
      const editor = editorRef.current;
      const model = editor.getModel();
      monaco.editor.setModelLanguage(model, selectedLanguage);
      editor.setValue(defaultCode[selectedLanguage]);

      editor.getAction('editor.action.formatDocument').run();
    }
  }, [selectedLanguage, monaco]);

  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(theme === 'light' ? 'vs' : 'vs-dark');
    }
  }, [theme, monaco]);

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
        toast.success('Lưu đoạn mã thành công', { autoClose: 1000 });
        dispatch(codesSaved());
      })
      .catch(() => {
        toast.error('Lưu đoạn mã thất bại, vui lòng thử lại sau', {
          autoClose: 1000,
        });
      });
    setOpenList(true);
    setOpenDialogNotAuth(false);
  };

  return (
    <>
      <Helmet>
        <title>Online Compiler</title>
      </Helmet>
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
          description={'Bạn cần phải đăng nhập trước khi lưu đoạn code này'}
          title={'Bạn chưa đăng nhập!'}
          open={openDialogNotAuth}
          setOpen={setOpenDialogNotAuth}
          actions={[
            {
              label: 'Hủy',
              onClick: () => setOpenDialogNotAuth(false),
              color: 'secondary',
            },
            {
              label: 'Xác nhận',
              onClick: () => {
                setOpenDialogNotAuth(false);
              },
              color: 'primary',
            },
          ]}
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
          <DialogTitle>Tiêu đề của đoạn mã</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hãy đặt tiêu đề cho đoạn mã bạn muốn lưu!
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Tiêu đề"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCodeTitleForm(false)}>Hủy</Button>
            <Button type="submit">Xác nhận</Button>
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
                isCompiling={isRunCodeLoading}
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
              {isRunCodeLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <CircularLoading />
                </Box>
              )}
              <CompilerOutput
                openList={openList}
                compileOutput={compileOutput}
                handleCheckAI={handleCheckAI}
                height={HEADER_HEIGHT}
                isCompiling={isRunCodeLoading}
                nextStepData={nextStepData && nextStepData.content}
                setCompileOutput={setCompileOutput}
                gptResponseError={gptResponseError}
                setGptResponseError={setGptResponseError}
                gptResponseRefactor={gptResponseRefactor}
                setGptResponseRefactor={setGptResponseRefactor}
                theme={theme}
                isAuth={isAuth}
                code={sourceCode}
                codesSavedData={codesSavedData}
                handleShowRefactor={handleShowRefactor}
                setOpenList={setOpenList}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CompilerPage;
