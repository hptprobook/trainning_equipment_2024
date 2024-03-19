import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, Popover, Stack, Typography, styled, useTheme } from '@mui/material';
// import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { NAV, NAV_WIDTH } from './layoutConfig';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAvatar = Boolean(anchorEl);
  const id = openAvatar ? 'simple-popover' : undefined;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        height: '100vh',
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        // 'msOverflowStyle': 'none',
        // 'scrollbarWidth': 'none',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        '& .MuiPaper-root': {
          backgroundColor: theme.palette.background.secondary,
          position: 'relative',
          'msOverflowStyle': 'none',
          'scrollbarWidth': 'none',
        },
        // '&:hover .MuiPaper-root': {
        //   'msOverflowStyle': 'block',
        //   'scrollbarWidth': 'block',
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
          bottom: '0',
          left: '0',
          backgroundColor: theme.palette.background.secondary,
        }}
      >
        <Stack spacing={1}>
          <List>
            <ListItem >
              <ListItemButton
                sx={{
                  borderRadius: '12px',
                  padding: '4px 8px',
                  backgroundColor: theme.palette.background.active,
                  '& .MuiListItemIcon-root': {
                    display: 'flex'
                  },
                }}
              >
                <ListItemText primary={'New Chat'} />
                <ItemIconCus>
                  <AddIcon />
                </ItemIconCus>
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton
                sx={{
                  borderRadius: '12px',
                  padding: '4px 8px',
                  '& .MuiListItemIcon-root': {
                    display: 'flex'
                  },
                }}
              >
                <ListItemText primary={'Help'} />
                <ItemIconCus>
                  <QuestionMarkIcon />
                </ItemIconCus>
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton
                sx={{
                  borderRadius: '12px',
                  padding: '12px 8px',
                  '& .MuiListItemIcon-root': {
                    display: 'flex'
                  },
                }}
                aria-describedby={id}
                onClick={handleClick}
              >
                <ListItemText primary={'User'} />
                <ItemIconCus>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ItemIconCus>

              </ListItemButton>
              <Popover
                id={id}
                open={openAvatar}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiPopover-root': {
                    borderRadius: '32px',
                  },
                }}
              >
                <List
                  sx={{
                    width: drawerWidth - 32,
                  }}
                >
                  <ListItem
                    sx={{
                      padding: theme.palette.padding.list,
                    }}
                  >
                    <ListItemButton
                      sx={{
                        borderRadius: '12px',
                        padding: '4px 8px',
                        '& .MuiListItemIcon-root': {
                          display: 'flex'
                        },
                      }}
                    >
                      <ListItemText primary={'Profile'} />
                      <ItemIconCus>
                        <PermIdentityIcon />
                      </ItemIconCus>
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    sx={{
                      padding: theme.palette.padding.list,
                    }}
                  >
                    <ListItemButton
                      sx={{
                        borderRadius: '12px',
                        padding: '4px 8px',
                        '& .MuiListItemIcon-root': {
                          display: 'flex'
                        },
                      }}
                    >
                      <ListItemText primary={'Logout'} />
                      <ItemIconCus>
                        <LogoutIcon />
                      </ItemIconCus>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </ListItem>
          </List>
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