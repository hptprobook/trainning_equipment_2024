import React from 'react';
import styled from '@emotion/styled';
import MuiAppBar from '@mui/material/AppBar';

import { useTheme } from '@emotion/react';
// import { MenuIcon } from '@mui/icons-material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import PropTypes from 'prop-types';
import { IconButton, Toolbar } from '@mui/material';
import { NAV_WIDTH } from './layoutConfig';

const drawerWidth = NAV_WIDTH;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = React.forwardRef(({ open, handleDrawerOpen }, ref) => {
  const theme = useTheme();
  return (
    <AppBar position="fixed" open={open} ref={ref}
      sx={{
        boxShadow: 'none'
      }}>
      <Toolbar
        sx={{
          backgroundColor: theme.palette.background.paper,
          // boxShadow: theme.shadows,
        }}
      >
        <IconButton
          aria-label="open menu"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 2,
            ...(open && { display: 'none' }),
            color: theme.palette.text.primary
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography
          color={theme.palette.text.primary}
          variant="h6" noWrap component="div">
                    Persistent drawer
        </Typography> */}
      </Toolbar>
    </AppBar>
  );
});
Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func
};
export default Header;