import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListCodeDrawer from '~/component/Drawer/Drawer';
import { useState } from 'react';

const CompilerOutput = ({ height, theme, setCompileOutput, handleCheckAI, isCompiling, compileOutput, isAuth }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      <ListCodeDrawer setOpen={setOpenDrawer} open={openDrawer} toggleDrawer={toggleDrawer} />
      <Box
        sx={{
          width: '100%',
          height: height,
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
          {isAuth && (
            <Button onClick={toggleDrawer(true)} size="small" variant="contained">
              List
            </Button>
          )}
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
              color: theme === 'dark' ? 'white' : '#333',
            }}
          >
            {compileOutput}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CompilerOutput;
