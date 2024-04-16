import { Box } from '@mui/material';
import './style.css';

export default function CodePending({ text = 'Searching ...' }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box className="terminal-loader">
        <Box className="terminal-header">
          <Box className="terminal-title">Code</Box>
          <Box className="terminal-controls">
            <Box className="control close"></Box>
            <Box className="control minimize"></Box>
            <Box className="control maximize"></Box>
          </Box>
        </Box>
        <Box className="text">{text}</Box>
      </Box>
    </Box>
  );
}
