import { List, ListItem, ListItemButton, ListItemIcon, styled, useTheme } from '@mui/material';
// import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ItemIconCus = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'auto',
  marginRight: '8px'
}));
const NavChat = () => {
  const theme = useTheme();
  const nav = [
    {
      name: 'Inbox',
      icon: <InboxIcon />
    },
    {
      name: 'Starred',
      icon: <MailIcon />
    },
    {
      name: 'Send email',
      icon: <InboxIcon />
    },
    {
      name: 'Drafts',
      icon: <MailIcon />
    }
  ];
  return (
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
              borderRadius: '24px',
            }}
          >
            <ItemIconCus
            >
              {item.icon}
            </ItemIconCus>
            <ListItemText primary={item.name} />
            <ItemIconCus>
              <MoreVertIcon />
            </ItemIconCus>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavChat;