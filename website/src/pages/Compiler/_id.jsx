import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Editor, { useMonaco } from '@monaco-editor/react';
import { convertShortLangToMonacoLang } from '~/utils/formatters';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  codesSaved,
  getDetails,
  updateCode,
} from '~/redux/slices/compilerSlice';
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

const HEADER_HEIGHT = '56px';
const CONTAINER_HEIGHT = `calc(100% - ${HEADER_HEIGHT})`;

export default function CompilerDetailPage() {
  const { id } = useParams();
  const details = useSelector((state) => state.compiler.details);
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(details ? details.title : '');
  const [openCodeTitleForm, setOpenCodeTitleForm] = useState(false);
  const [theme, setTheme] = useState('light');
  const [editorFontSize, setEditorFontSize] = useState(15);
  const [sourceCode, setSourceCode] = useState(details ? details.code : '');
  const selectedLanguage = details
    ? convertShortLangToMonacoLang(details.language)
    : 'javascript';
  const codesSavedData = useSelector((state) => state.compiler.codesSavedData);
  const [openDialogNotAuth, setOpenDialogNotAuth] = useState(false);
  const isAuth = useAuth();
  const [openList, setOpenList] = useState(false);
  const { nextStepData, isRunCodeLoading } = useSelector(
    (state) => state.compiler
  );

  const {
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

  const handleCheckAI = () => {
    navigate('/chat', { state: { sourceCode } });
  };

  const handleEditorChange = (value) => {
    setSourceCode(value);
  };

  useEffect(() => {
    if (id) {
      dispatch(getDetails({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(codesSaved());
    setTitle(details?.title || '');
    setSourceCode(details?.code || '');
  }, [dispatch, details, setSourceCode]);

  useEffect(() => {
    if (editorRef.current && details) {
      const editor = editorRef.current;

      const position = editor.getPosition();
      const range = editor.getSelection();

      monaco.editor.setModelLanguage(
        editorRef.current.getModel(),
        convertShortLangToMonacoLang(details.language)
      );
      editorRef.current.setValue(details.code);

      editor.setPosition(position);
      editor.setSelection(range);

      editor.getAction('editor.action.formatDocument').run();
    }
  }, [selectedLanguage, monaco, details]);

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
    dispatch(
      updateCode({
        id,
        data: {
          title,
          code: sourceCode,
        },
      })
    )
      .then(() => {
        toast.success('Cập nhật mã thành công!', { autoClose: 1000 });
        dispatch(codesSaved());
      })
      .catch(() => {
        toast.error('Cập nhật đoạn mã thất bại, Vui lòng thử lại', {
          autoClose: 1000,
        });
      });
    setOpenDialogNotAuth(false);
  };

  if (!details) return <CircularLoading />;

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
              Cập nhật tiêu đề cho đoạn mã này
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                setTheme={setTheme}
                theme={theme}
                title={details?.title}
              />
              <Editor
                height={`calc(100vh - ${HEADER_HEIGHT} - ${HEADER_HEIGHT} )`}
                defaultLanguage={selectedLanguage}
                defaultValue={details?.code}
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
                gptResponseRefactor={gptResponseRefactor}
                setGptResponseError={setGptResponseError}
                setGptResponseRefactor={setGptResponseRefactor}
                theme={theme}
                isAuth={isAuth}
                code={sourceCode}
                codesSavedData={codesSavedData}
                handleShowRefactor={handleShowRefactor}
                setOpenList={setOpenList}
                isDetails={true}
                id={id}
                isPublic={details?.isPublic}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
