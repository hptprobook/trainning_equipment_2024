
import { Box, Button, Container, Grid, IconButton, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InputChat from '~/component/ChatComponent/InputChat';
import React from 'react';
import { useResponsive } from '~/config/reponsiveConfig';
import CardAnswer from '~/component/Card/CardAnswer';
const ChatDetail = () => {
  const heightRef = React.useRef(null);
  const [mainHeight, setMainHeight] = React.useState(0);
  React.useEffect(() => {
    if (heightRef.current) {
      setMainHeight(heightRef.current.clientHeight);
    }
  }, [heightRef]);
  const mdReponsive = useResponsive('down', 'md');

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
        <Stack spacing={2} direction="column">
          <CardAnswer
            name={'TIn'}
            avatar={'https://mui.com/static/images/avatar/1.jpg'}
            answer={'Hello'}
          />
               <CardAnswer
            name={'Tin'}
            avatar={'https://mui.com/static/images/avatar/1.jpg'}
            answer={'HelHelloHelloHelHelHelloHelloHelloHelloHelloHelloloHelHelloHelloHelloHelloHelloHelloloHelHelloHelloHelloHelloHelloHelloloHelHelloHelloHelloHelloHelloHellololoHelloHelloHellolo'}
          />
        </Stack>

      </Grid>
      <Grid ref={heightRef} item xs={12} >
        <InputChat />
      </Grid>
    </Grid>
  );
};
export default ChatDetail;
