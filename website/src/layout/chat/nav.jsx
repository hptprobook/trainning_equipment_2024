import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, Stack, styled, useTheme } from '@mui/material';
// import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NewChatButton from './common/NewChatButton';
import PropTypes from 'prop-types';
import { NAV, NAV_WIDTH } from './layoutConfig';

const drawerWidth = NAV_WIDTH;
const nav = NAV;
const ItemIconCus = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'auto',
  marginRight: '8px',
  position: 'absolute',
  right: '0',
  display: 'none'
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const NavChat = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        height: '100vh',
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        '& .MuiPaper-root': {
          backgroundColor: theme.palette.background.secondary,
          position: 'relative',
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        // '&:hover .MuiPaper-root': {
        //   '-ms-overflow-style': 'block',
        //   'scrollbar-width': 'block',
        // }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        {nav.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              padding: theme.palette.padding.list,
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '12px',
                padding: '4px 8px',
                '&:hover .MuiListItemIcon-root': {
                  display: 'flex'
                },
              }}
            >
              <ListItemText primary={item.name} />
              <ItemIconCus>
                <MoreVertIcon />
              </ItemIconCus>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          position: 'fixed',
          width: drawerWidth,
          padding: '12px',
          bottom: '0',
          left: '0',
          backgroundColor: theme.palette.background.secondary,
        }}
      >
        <Stack spacing={1}>
          <NewChatButton />
          <NewChatButton />
          <NewChatButton />
        </Stack>
      </Box>
    </Drawer>
  );
};
NavChat.protoType = {
  handleDrawerClose: PropTypes.func,
  open: PropTypes.bool
};
export default NavChat;