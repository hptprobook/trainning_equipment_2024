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
import moment from 'moment';

export default function ListCodeDrawer({
  open = false,
  toggleDrawer,
  codesSavedData,
}) {
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleDelete = (id) => {
    confirm({
      title: 'Xóa đoạn mã này?',
      description: 'Hành động này sẽ xóa vĩnh viễn đoạn mã. Bạn chắc chắn chứ?',
    })
      .then(() => {
        try {
          dispatch(deleteCode(id));
          dispatch(codesSaved());
          toast.success('Xóa đoạn mã thành công');
        } catch (error) {
          toast.error('Xóa đoạn mã thất bại, vui lòng thử lại');
        }
      })
      .catch(() => {
        //
      });
  };

  const dateCategories = {
    today: [],
    yesterday: [],
    threeDays: [],
    sevenDays: [],
    oneMonth: [],
  };

  codesSavedData?.forEach((code) => {
    const now = moment();
    const codeDate = moment(code.createdAt);
    const diffDays = now.diff(codeDate, 'days');

    if (diffDays === 0) {
      dateCategories.today.push(code);
    } else if (diffDays === 1) {
      dateCategories.yesterday.push(code);
    } else if (diffDays <= 3) {
      dateCategories.threeDays.push(code);
    } else if (diffDays <= 7) {
      dateCategories.sevenDays.push(code);
    } else if (now.diff(codeDate, 'months') < 1) {
      dateCategories.oneMonth.push(code);
    }
  });

  const renderListByCategory = (category, title) => (
    <>
      {category.length > 0 && (
        <Typography
          sx={{
            fontSize: '12px',
            pl: 1,
            pb: 1,
            pt: 2.5,
            color: '#01579b',
            textDecoration: 'underline',
          }}
        >
          {title}
        </Typography>
      )}
      {category.map((data) => (
        <ListItem key={data._id} sx={{ p: 0.5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#26c6da',
              },
            }}
          >
            <Link
              style={{
                width: '100%',
                height: '100%',
                textDecoration: 'none',
                color: '#333',
                padding: '8px 16px',
              }}
              to={`/compiler/${data._id}`}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={truncateString(data.title, 30)} />
            </Link>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDelete(data._id)}
                sx={{
                  mr: 1,
                  '&:hover': {
                    color: '#fff',
                  },
                }}
                edge="start"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
        </ListItem>
      ))}
    </>
  );

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      {renderListByCategory(dateCategories.today, 'Hôm nay')}
      {renderListByCategory(dateCategories.yesterday, 'Hôm qua')}
      {renderListByCategory(dateCategories.threeDays, '3 Ngày trước')}
      {renderListByCategory(dateCategories.sevenDays, '7 Ngày trước')}
      {renderListByCategory(dateCategories.oneMonth, '1 Tháng trước')}
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Typography
          variant="h6"
          textAlign={'center'}
          pt={2}
          color="initial"
          sx={{
            mb: 2,
          }}
        >
          LOGO
        </Typography>
        {DrawerList}
      </Drawer>
    </div>
  );
}
