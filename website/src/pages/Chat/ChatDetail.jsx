
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
  const mess = 'The CSS you\'ve provided targets the end track piece of the horizontal scrollbar to hide it. However, the CSS pseudo-elements for scrollbar customization are not directly supported as inline styles in React. You need to apply these styles in a CSS file or within a style block in your React component.';

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
          overflowY: 'scroll',
          scrollbarWidth: 'none', /* For Firefox */
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            width: 'auto', /* For horizontal scrollbar */
            height: '0px', /* For vertical scrollbar */
          }
        }}
      >
        <CardAnswer
          name={'TIn'}
          avatar={'https://mui.com/static/images/avatar/1.jpg'}
          answer={'Hello'}
        />
        <CardAnswer
          name={'Tin'}
          avatar={'https://mui.com/static/images/avatar/1.jpg'}
          answer={mess}
        />
             <CardAnswer
          name={'Tin'}
          avatar={'https://mui.com/static/images/avatar/1.jpg'}
          answer={'answeransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweransweranswer'}
        />

      </Grid>
      <Grid ref={heightRef} item xs={12} >
        <InputChat />
      </Grid>
    </Grid>
  );
};
export default ChatDetail;
