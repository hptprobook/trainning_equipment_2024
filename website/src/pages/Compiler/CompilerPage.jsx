import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { convertLanguage, defaultCode } from '~/utils/formatters';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { codesSaved, runCode, saveCode } from '~/redux/slices/compilerSlice';
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
import CircularProgress from '@mui/material/CircularProgress';

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
  const codesSavedData = useSelector((state) => state.compiler.codesSavedData);
  const [openDialogNotAuth, setOpenDialogNotAuth] = useState(false);
  const isAuth = useAuth();

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

  const handleRunCode = async () => {
    // const languageForServer = convertLanguage(selectedLanguage);
    setIsCompiling(true);
    setCompileOutput('');

    try {
      const resultAction = await dispatch(
        runCode({
          language: selectedLanguage,
          code: sourceCode,
        })
      ).unwrap();

      if (resultAction.status === 'success') {
        setCompileOutput(resultAction.stdout);
      } else {
        setCompileOutput(
          resultAction.error || 'Đã xảy ra lỗi, vui lòng thử lại'
        );
      }
    } catch (err) {
      toast.error('Biên dịch mã bị lỗi, vui lòng thử lại!', {
        autoClose: 1000,
      });
    } finally {
      setIsCompiling(false);
    }
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(sourceCode)
        .then(() => {
          toast.success('Đã sao chép!', {
            autoClose: 500,
          });
        })
        .catch(() => {
          toast.error('Lỗi khi sao chép mã, vui lòng thử lại!');
        });
    } else {
      toast.warning('Bộ nhớ tạm chưa sẵn sàng, vui lòng thử lại.');
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
        toast.success('Lưu đoạn mã thành công', { autoClose: 1000 });
        dispatch(codesSaved());
      })
      .catch(() => {
        toast.error('Lưu đoạn mã thất bại, vui lòng thử lại sau', {
          autoClose: 1000,
        });
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
          description={'Bạn cần phải đăng nhập trước khi lưu đoạn code này'}
          title={'Bạn chưa đăng nhập!'}
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
              label="Title"
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
              {isCompiling && (
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <CompilerOutput
                compileOutput={compileOutput}
                handleCheckAI={handleCheckAI}
                height={HEADER_HEIGHT}
                isCompiling={isCompiling}
                setCompileOutput={setCompileOutput}
                theme={theme}
                isAuth={isAuth}
                codesSavedData={codesSavedData}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CompilerPage;
