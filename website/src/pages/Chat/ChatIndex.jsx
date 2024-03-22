
import { Box, Button, Container, Grid, IconButton, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InputChat from '~/component/ChatComponent/InputChat';
import React from 'react';
import { useResponsive } from '~/config/reponsiveConfig';
import NewChat from '~/component/ChatComponent/NewChat';
import InputChatWithPrompt from '~/component/ChatComponent/InputChatWithPrompt';
export const ChatIndex = () => {
  const heightRef = React.useRef(null);
  const [mainHeight, setMainHeight] = React.useState(0);
  React.useEffect(() => {
    if (heightRef.current) {
      setMainHeight(heightRef.current.clientHeight);
    }
  }, [heightRef]);
  const mdReponsive = useResponsive('down', 'md');
  const [addPrompt, setAddPrompt] = React.useState(false);
  const [promt, setPromt] = React.useState({ title: '', content: '' });
  const handleAddPrompt = (content) => {
    setPromt(content);
    setAddPrompt(true);
  };
  const handleCancel = () => {
    setAddPrompt(false);
  }
  return (
    <Grid
      container
      spacing={2}
      flexDirection={'row'}
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: mdReponsive ? '100%' : '800px',
        maxWidth: '100%',
      }}
    >
      <Grid item xs={12}
        sx={{
          height: mainHeight ? `calc(100% - ${mainHeight}px)` : '100%',
          overflow: 'auto',

        }}
      >
        <NewChat handleAddPrompt={handleAddPrompt} />
      </Grid>
      <Grid ref={heightRef} item xs={12} >
        <InputChat />
        {addPrompt ? <InputChatWithPrompt promt={promt} handleGetChat={() => { }} handleCancel={handleCancel} /> : null}
      </Grid>
    </Grid>
  );
};
