import { Box, IconButton, Modal, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './style.css';
import OptionSelect from '../Select/OptionSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  languageOption,
  modeOption,
  styleWriting,
} from '~/config/optionConfig';
import { AudioRecorder } from 'react-audio-voice-recorder';
import MicIcon from '@mui/icons-material/Mic';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '24px',
};

const InputChat = ({ handleGetContent, handleGetVoice }) => {
  const status = useSelector((state) => state.chat.status);
  const [dissable, setDissable] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInput = (e) => {
    if (e.target.value === '') {
      setDissable(true);
    } else {
      setDissable(false);
    }
  };
  const dispatch = useDispatch();
  const handleForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    if (value.language !== '') {
      value.input =
				value.input + ' ' + ` with language output: ${value.language}`;
    }
    if (value.style !== '') {
      value.input = value.input + ' ' + ` and style writing: ${value.style}`;
    }
    e.target.reset();
    handleGetContent(value);
  };
  useEffect(() => {
    if (status === 'loading') {
      setDissable(true);
    }
  }, [status]);
  const addAudioElement = async (blob) => {
 
    handleGetVoice(blob);
    handleClose();
  };
  return (
    <Box className="container-chat-input">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={false}
            downloadFileExtension="webm"
          />
        </Box>

      </Modal>

      <form onSubmit={handleForm}>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            padding: '12px 0',
          }}
        >
          <OptionSelect
            label={'Ngôn ngữ'}
            option={languageOption}
            name={'language'}
            noneValue={false}
            dfValue="vietnamese"
          />
          <OptionSelect
            label={'Phong cách viết'}
            option={styleWriting}
            name={'style'}
            noneValue={false}
          />
          <OptionSelect
            noneValue={false}
            label={'Phiên bản'}
            option={modeOption}
            name={'model'}
            dfValue={'gemini'}
          />
        </Stack>
        <div className="chat-input">
          <TextField
            id="input-chat"
            multiline
            name="input"
            onChange={handleInput}
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
              },
            }}
          />
          <div className="btn-submit">
            <IconButton aria-label="send" type="button" onClick={handleOpen}>
              <MicIcon />
            </IconButton>
          </div>
          <div className="btn-submit">
            <IconButton aria-label="send" disabled={dissable} type="submit">
              <ArrowUpwardIcon />
            </IconButton>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default InputChat;
