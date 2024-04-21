import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import useAuth from '~/customHooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '~/context/user.context';
import { handleToast } from '~/config/toast';
import { useDispatch, useSelector } from 'react-redux';
import { resetStateAction } from '~/redux/slices/authSlice';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { handleGetAllConversations } from '~/redux/slices/conversationsSlice';

export default function CompilerHeader({ height, theme }) {
  const isAuth = useAuth();
  const { setLogin } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.auth.userGit);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user.dataUser);
      dispatch(handleGetAllConversations());
    }
  }, [user, dispatch, navigate]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('git_token');
    handleToast('success', 'Đăng xuất thành công!');
    dispatch(resetStateAction());
    navigate('/login');
    setLogin(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        bgcolor: theme === 'light' ? '#eeeeee' : '#424242',
      }}
    >
      <Link to={'/'}>
        <img src="/logo/fpt.png" height={40} alt="" />
      </Link>

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Link to={'/chat'}>
          <Button
            variant="outlined"
            color="warning"
            sx={{
              color: '#f27220',
              borderColor: '#f27220',
              mt: '2px',
            }}
            endIcon={<ArrowRightAltIcon />}
          >
            {isAuth ? 'Bee Chat' : 'Login'}
          </Button>
        </Link>

        <Box>
          <Tooltip title="Tài khoản">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }} src={userData?.avatar} />{' '}
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>Xin chào, {userData?.name}</MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>

        <Link
          to={isAuth ? '/chat' : '/login'}
          style={{
            color: theme === 'light' ? '#333' : '#fff',
          }}
        ></Link>
      </Box>
    </Box>
  );
}
