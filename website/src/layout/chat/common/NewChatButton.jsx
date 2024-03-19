// import React from 'react';

import { Box, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NewChatButton = () => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      endIcon={<AddIcon />}
      sx={{
        width: '100%',
        color: 'black',
        backgroundColor: '#d4dae1',
        borderRadius: '20px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          // color: theme.palette.text.normal,
          backgroundColor: theme.palette.background.hoverActive,
        }
      }}
    >
      New Chat
    </Button>
  );
};

export default NewChatButton;