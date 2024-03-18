import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
// import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';

const NavChat = () => {
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
        <ListItem key={item.name} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavChat;