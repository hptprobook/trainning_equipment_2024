import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import { useResponsive } from '~/config/reponsiveConfig';
import Header from './header';
import NavChat from './nav';
import { NAV_WIDTH } from './layoutConfig';

const drawerWidth = NAV_WIDTH;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, headerheight }) => ({
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    paddingTop: headerheight,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
export default function ChatLayout({ children }) {
  const [open, setOpen] = React.useState(true);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const heightRef = React.useRef(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (heightRef.current) {
      setHeaderHeight(heightRef.current.clientHeight);
    }
  }, [heightRef]);
  const mdReponsive = useResponsive('down', 'md');
  React.useEffect(() => {
    setOpen(!mdReponsive);
  }, [mdReponsive]);
  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Header ref={heightRef} open={open} handleDrawerOpen={handleDrawerOpen} />
      <NavChat open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open} headerheight={headerHeight}>
        <Box
          sx={{
            padding: 3,
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
}
ChatLayout.propTypes = {
  children: PropTypes.node.isRequired
};