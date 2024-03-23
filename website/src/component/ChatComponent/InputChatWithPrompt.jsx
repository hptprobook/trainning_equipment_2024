import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './style.css';
import OptionSelect from '../Select/OptionSelect';
const languageOption = [
  {
    name: 'English',
    value: 'english'
  },
  {
    name: 'Viet Nam',
    value: 'vietnamese'
  },
  {
    name: 'Japanese',
    value: 'japanese'
  }
];
const styleWriting = [
  {
    name: 'Default',
    value: 'default'
  },
  {
    name: 'Academic',
    value: 'academic'
  },
  {
    name: 'Creative',
    value: 'creative'
  },
  {
    name: 'Critical',
    value: 'critical'
  }
];

const InputChatWithPrompt = ({ promt, handleGetChat, handleCancel }) => {
  const handleValue = (value) => {
    console.log(value);
  };

  return (
    <Box
      className='container-chat-with-prompt'
    >
      <Typography sx={{ fontSize: 17 }} color="text.secondary" padding={2} gutterBottom>
        {promt.title}
      </Typography>
      <Typography variant="body2" padding={2}>
        {promt.content}
      </Typography>
      <div className='chat-input'>
        <input placeholder='Type your content' type="text" className='input' />
        <IconButton aria-label="send">
          <ArrowUpwardIcon />
        </IconButton>
      </div>
      <Button sx={{ margin: 2 }} onClick={handleCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default InputChatWithPrompt;