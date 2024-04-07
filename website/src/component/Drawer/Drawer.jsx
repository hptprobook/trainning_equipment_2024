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
import { truncateString } from '~/utils/formatters';
import { useDispatch } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { codesSaved, deleteCode } from '~/redux/slices/compilerSlice';
import Divider from '@mui/material/Divider';

export default function ListCodeDrawer({
  open = false,
  toggleDrawer,
  codesSavedData,
}) {
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete?',
      description:
        'This action will permanently delete your save. Are you sure?',
    })
      .then(() => {
        try {
          dispatch(deleteCode(id));
          dispatch(codesSaved());
          toast.success('Code deleted successfully');
        } catch (error) {
          toast.error('Error deleting code');
        }
      })
      .catch(() => {
        //
      });
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      <Typography variant="h6" textAlign={'center'} pt={2} color="initial">
        Danh sách đoạn mã đã lưu
      </Typography>
      <List>
        {codesSavedData?.map((data) => (
          <>
            <ListItem
              key={data?._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Link
                style={{
                  width: '100%',
                  textDecoration: 'none',
                  color: '#333',
                }}
                to={`/compiler/${data?._id}`}
                onClick={toggleDrawer(false)}
              >
                <ListItemText
                  sx={{
                    ':hover': {
                      color: 'green',
                    },
                  }}
                  primary={truncateString(data?.title, 30)}
                />
              </Link>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleDelete(data._id)}
                  edge="start"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
          </>
        ))}
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
