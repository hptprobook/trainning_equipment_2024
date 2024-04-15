/* eslint-disable indent */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListCodeDrawer from '~/component/Drawer/Drawer';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shareCode } from '~/redux/slices/compilerSlice';
import { toast } from 'react-toastify';
import { CLIENT_ROOT } from '~/utils/constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/Dialog';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TocIcon from '@mui/icons-material/Toc';
import AssistantIcon from '@mui/icons-material/Assistant';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import CodePending from '~/component/CodePending/CodePending';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import { Divider } from '@mui/material';

const CompilerOutput = ({
  height,
  theme,
  setCompileOutput,
  handleCheckAI,
  compileOutput,
  isAuth,
  codesSavedData,
  isDetails,
  id,
  isPublic,
  isPublicPage = false,
  gptResponseError = null,
  handleShowRefactor,
  gptResponseRefactor,
}) => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isNextStepLoading } = useSelector((state) => state.compiler);
  const [copiedRefactor, setCopiedRefactor] = useState(
    gptResponseRefactor
      ? Array(gptResponseRefactor.refactors.length).fill(false)
      : null
  );

  const copyToClipboard = (codeString) => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const copyToClipboardRefactor = (codeString, index) => {
    navigator.clipboard.writeText(codeString);
    const newCopiedRefactor = [...copiedRefactor];
    newCopiedRefactor[index] = true;
    setCopiedRefactor(newCopiedRefactor);
    setTimeout(() => {
      const resetCopiedRefactor = [...copiedRefactor];
      resetCopiedRefactor[index] = false;
      setCopiedRefactor(resetCopiedRefactor);
    }, 1000);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
  const [openURLDialog, setOpenURLDialog] = useState(false);
  const publicURL = `${CLIENT_ROOT}/compiler/public/${id}`;

  const handleOpenURLDialog = () => {
    setOpenURLDialog(true);
  };

  const handleCloseURLDialog = () => {
    setOpenURLDialog(false);
  };

  const handleCopyURL = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(publicURL).then(() => {
        toast.info('Đã copy địa chỉ vào bộ nhớ tạm!', {
          autoClose: 3000,
        });
        handleCloseURLDialog();
      });
    } else {
      alert('Bộ nhớ tạm chưa sẵn sàng, vui lòng thử lại sau');
    }
  };

  const handlePublicCode = () => {
    dispatch(shareCode(id)).then(() => {
      toast.success('Đoạn mã đã được công bố!', { autoClose: 1000 });
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(`${CLIENT_ROOT}/compiler/public/${id}`)
          .then(() => {
            toast.info('Địa chỉ mã nguồn đã được sao chép!', {
              autoClose: 3000,
            });
          });
      } else {
        alert('Bộ nhớ tạm chưa sẵn sàng, vui lòng thử lại sau.');
      }
    });
  };

  return (
    <>
      {!isPublicPage ? (
        <ListCodeDrawer
          setOpen={setOpenDrawer}
          open={openDrawer}
          toggleDrawer={toggleDrawer}
          codesSavedData={codesSavedData}
        />
      ) : (
        ''
      )}
      <Box
        sx={{
          width: '100%',
          height: height,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          borderBottom: '1px solid #c9c6c6',
          bgcolor: theme === 'light' ? 'fff' : '#1e1e1e',
        }}
      >
        <Typography color={theme === 'light' ? 'inherit' : '#fff'}>
          Đầu ra
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Tooltip title="Làm mới">
            <IconButton onClick={() => setCompileOutput('')}>
              <NotInterestedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gửi tới AI">
            <IconButton
              onClick={() => handleCheckAI('')}
              className="jr-fourth-step"
            >
              <AssistantIcon />
            </IconButton>
          </Tooltip>

          {isAuth && (
            <Tooltip title="Đoạn mã đã lưu">
              <IconButton onClick={toggleDrawer(true)}>
                <TocIcon />
              </IconButton>
            </Tooltip>
          )}
          {isDetails && !isPublic && (
            <Tooltip title="Chia sẻ với cộng đồng">
              <IconButton onClick={handlePublicCode}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          )}
          {isPublic && (
            <Tooltip title="Địa chỉ đoạn mã này">
              <IconButton onClick={handleOpenURLDialog}>
                <LinkIcon />
              </IconButton>
            </Tooltip>
          )}
          <Dialog open={openURLDialog} onClose={handleCloseURLDialog}>
            <DialogTitle>Địa chỉ đoạn code này</DialogTitle>
            <DialogContent>
              <DialogContentText>{publicURL}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCopyURL}>Sao chép</Button>
              <Button onClick={handleCloseURLDialog}>Đóng</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <Box
        sx={{
          px: 4,
          py: 2,
          overflowY: 'auto',
          height: '800px',
        }}
      >
        {gptResponseError === null ? (
          <>
            {compileOutput && (
              <>
                <Typography
                  sx={{
                    whiteSpace: 'pre-wrap',
                    color: theme === 'dark' ? 'white' : '#333',
                    mt: 1,
                  }}
                  gutterBottom
                >
                  {compileOutput}
                </Typography>
                <Divider />
              </>
            )}
            {compileOutput &&
              compileOutput !==
                'Có lỗi trong đoạn mã này. Chúng tôi đang tìm phương hướng giải quyết cho đoạn mã của bạn...' &&
              !gptResponseRefactor && (
                <Button
                  onClick={handleShowRefactor}
                  sx={{
                    textTransform: 'none',
                    mt: 2,
                  }}
                  endIcon={<SwipeRightIcon />}
                  disabled={isNextStepLoading}
                >
                  Tối ưu đoạn mã
                </Button>
              )}
            {gptResponseRefactor && (
              <Typography
                sx={{
                  mt: 4,
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                Các cách để đoạn mã tối ưu hơn:{' '}
              </Typography>
            )}
            {gptResponseRefactor &&
              gptResponseRefactor.refactors.map((refactor, i) => (
                <React.Fragment key={i}>
                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: '13px',
                      fontWeight: '400',
                      fontStyle: 'italic',
                    }}
                  >
                    {refactor.direction}:{' '}
                  </Typography>
                  {refactor.code && (
                    <Box style={{ position: 'relative' }}>
                      <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                      >
                        {refactor.code}
                      </SyntaxHighlighter>
                      <Button
                        onClick={() =>
                          copyToClipboardRefactor(refactor.code, i)
                        }
                        sx={{
                          position: 'absolute',
                          top: 1,
                          right: 1,
                          fontSize: '12px',
                          textTransform: 'none',
                          color: '#fff',
                          fontWeight: 300,
                        }}
                      >
                        Copy
                      </Button>
                    </Box>
                  )}
                </React.Fragment>
              ))}
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Các lỗi bạn đã mắc phải:{' '}
            </Typography>
            {gptResponseError.errors.map((err, i) => (
              <Typography
                sx={{
                  ml: 2,
                }}
                key={i}
              >
                {err.error}
              </Typography>
            ))}
            <Typography
              variant="h6"
              sx={{
                mt: 1,
              }}
              gutterBottom
            >
              Cách sửa lỗi:{' '}
            </Typography>
            <Typography
              sx={{
                ml: 2,
              }}
            >
              {gptResponseError.recommends}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
              }}
              gutterBottom
            >
              Đoạn code chính xác như sau:{' '}
            </Typography>
            <Box style={{ position: 'relative' }}>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {gptResponseError.correctCode}
              </SyntaxHighlighter>
              <Button
                onClick={() => copyToClipboard(gptResponseError.correctCode)}
                sx={{
                  position: 'absolute',
                  top: 1,
                  right: 1,
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#fff',
                  fontWeight: 300,
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Box>
          </>
        )}
        {isNextStepLoading && <CodePending />}
      </Box>
    </>
  );
};

export default CompilerOutput;
