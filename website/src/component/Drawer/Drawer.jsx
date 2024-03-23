import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function ListCodeDrawer({ open = false, toggleDrawer }) {
  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      <Typography variant="h6" textAlign={'center'} pt={2} color="initial">
        Saved code snippets
      </Typography>
      <List>
        <Link to={'/'}>
          <ListItem>
            <ListItemText primary={'Hello World'} />
            <Tooltip title="Delete">
              <IconButton onClick={() => alert('Delete')} edge="start" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
