import { Box, IconButton, Stack } from '@mui/material';
import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './style.css';
import OptionSelect from '../Select/OptionSelect';
const defaultOption = [
  {
    name: 'Option 1',
    value: 'option1'
  },
  {
    name: 'Option 2',
    value: 'option2'
  },
];
const InputChat = () => {
  const handleValue = (value) => {
    console.log(value);
  };

  return (
    <Box
      className='container-chat-input'
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{
          padding: '12px',
        }}
      >
        <OptionSelect label={'option'} option={defaultOption} handle={handleValue} />
        <OptionSelect label={'option'} option={defaultOption} handle={handleValue} />
      </Stack>
      <div className='chat-input'>
        <input placeholder='Type your question' type="text" className='input' />
        <IconButton aria-label="send">
          <ArrowUpwardIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default InputChat;