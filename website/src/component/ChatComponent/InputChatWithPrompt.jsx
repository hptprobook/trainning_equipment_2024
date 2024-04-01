import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './style.css';
import OptionSelect from '../Select/OptionSelect';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
const modeOption = [
  {
    name: 'Gemini',
    value: 'gemini'
  },
  {
    name: 'Chat GPT',
    value: 'gpt'
  }
];
const InputChatWithPrompt = ({ promt, handleGetContent, handleCancel }) => {
  const [dissable, setDissable] = React.useState(true);
  const status = useSelector((state) => state.chat.status);
  useEffect(() => {
    if (status === 'loading') {
      setDissable(true);
    }
  }, [status]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    if (value.language !== '') {
      value.prompt = value.prompt.replaceAll('{{TARGET_LANGUAGE}}', value.language);
    }
    else {
      value.prompt = value.prompt.replaceAll('{{TARGET_LANGUAGE}}', 'english');
    }
    if (value.style !== '') {
      value.prompt = value.prompt.replaceAll('{{STYLE_WRITING}}', value.style);
    }
    value.input = value.prompt.replace('{{PROMPT}}', value.input);
    handleCancel();
    e.target.reset();
    handleGetContent(value);
  };
  const handleChange = (e) => {
    if (e.target.value !== '') {
      setDissable(false);
    }
    else {
      setDissable(true);
    }
  }
  return (
    <Box
      className='container-chat-with-prompt'
    >
      <form onSubmit={handleSubmit}>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" padding={2} gutterBottom>
          {promt.title}
        </Typography>
        <Typography variant="body2" padding={2}>
          {promt.content}
        </Typography>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            padding: '12px',
          }}
        >
          <OptionSelect label={'Language'} option={languageOption} name={'language'} />
          <OptionSelect label={'Style Writing'} option={styleWriting} name={'style'} />
          <OptionSelect noneValue={false} label={'Model'} option={modeOption} name={'model'} />
        </Stack>
        <div className='chat-input'>
          <input type="hidden" value={promt.template} name='prompt' />
          <TextField
            id="input-chat"
            multiline
            name='input'
            onChange={handleChange}
            maxRows={3}
            fullWidth
            placeholder="Input"
            sx={{
              '& .MuiInputBase-root': {
                padding: 0,
              },
              '& .MuiInputBase-input': {
                padding: '12px 0',
              },
              '& .MuiInputBase-root fieldset': {
                border: 'none',
              }
            }}
          />
          <div className='btn-submit'>
            <IconButton aria-label="send" disabled={dissable} type='submit'>
              <ArrowUpwardIcon />
            </IconButton>
          </div>
        </div>
        <Button sx={{ margin: 2 }} onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default InputChatWithPrompt;