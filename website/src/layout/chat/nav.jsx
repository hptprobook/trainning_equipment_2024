import {
  Avatar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popover,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
// import React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { NAV_WIDTH } from './layoutConfig';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetStateAction } from '~/redux/slices/authSlice';
import { handleToast } from '~/config/toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
  handleArchiveConversations,
  handleDeleteAllConversations,
  handleDeleteConversation,
  handleGetAllConversations,
  resetStateDelete,
} from '~/redux/slices/conversationsSlice';
import { UserContext } from '~/context/user.context';
const drawerWidth = NAV_WIDTH;
const ItemIconCus = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 'auto',
  marginRight: '8px',
  position: 'absolute',
  right: '0',
  display: 'none',
}));
const ChipStatus = styled(Typography)(({ theme }) => ({
  padding: '2px 8px',
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.5px',
  color: theme.palette.text.active,
  borderRadius: '14px',
  backgroundColor: theme.palette.background.active,
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
  const [idItem, setIdItem] = React.useState(null);
  const [deleteId, setDeleteId] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElItem, setAnchorElItem] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [nav, setNav] = React.useState([]);
  const [heightAvatar, setHeightAvatar] = React.useState(0);
  const heightRef = React.useRef(null);
  const [heightLogo, setHeightLogo] = React.useState(0);
  const heightLogoRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setLogin } = useContext(UserContext);
  const dataConversations = useSelector((state) => state.conversations.all);
  const statusAdd = useSelector((state) => state.conversations.status);
  const user = useSelector((state) => state.auth.userGit);
  const error = useSelector((state) => state.auth.error);
  const statusDelete = useSelector((state) => state.conversations.statusDelete);
  const statusArchive = useSelector(
    (state) => state.conversations.statusArchive
  );
  const statusDeleteAll = useSelector(
    (state) => state.conversations.statusDeleteAll
  );
  useEffect(() => {
    if (dataConversations) {
      setNav(dataConversations.data);
    }
  }, [dataConversations]);
  useEffect(() => {
    if (heightRef.current) {
      setHeightAvatar(heightRef.current.clientHeight);
    }
    if (heightLogoRef.current) {
      setHeightLogo(heightLogoRef.current.clientHeight);
    }

  }, [heightRef, heightLogoRef]);
  useEffect(() => {
    if (statusAdd === 'success') {
      dispatch(handleGetAllConversations());
    }
  }, [statusAdd, dispatch]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    if (statusDeleteAll === 'success') {
      handleToast('success', 'Xóa tất cả cuộc trò chuyện thành công!');
      dispatch(handleGetAllConversations());
      navigate('/chat');
    }
  }, [statusDeleteAll, dispatch, navigate]);
  useEffect(() => {
    if (statusDelete === 'success') {
      handleToast('success', 'Xóa cuộc trò chuyện thành công!');
      dispatch(handleGetAllConversations());
      dispatch(resetStateDelete());
      if (deleteId === id) {
        navigate('/chat');
      }
      setDeleteId(null);
    }
  }, [statusDelete, dispatch, navigate, deleteId, id]);
  useEffect(() => {
    if (statusArchive === 'success') {
      handleToast('success', 'Lưu trữ cuộc trò chuyện thành công!');
      dispatch(handleGetAllConversations());
    }
  }, [statusArchive, dispatch]);
  useEffect(() => {
    if (user) {
      setData(user.dataUser);
      dispatch(handleGetAllConversations());
    }
  }, [user, dispatch, navigate]);
  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (error) {
      dispatch(resetStateAction());
      handleToast('error', error);
      localStorage.removeItem('token');
      localStorage.removeItem('git_token');
      navigate('/login');
    }
  }, [error, navigate, dispatch]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseItem = () => {
    setAnchorElItem(null);
    setIdItem(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('git_token');
    handleToast('success', 'Đăng xuất thành công!');
    dispatch(resetStateAction());
    navigate('/login');
    setLogin(false);
  };
  const handleDelete = () => {
    setDeleteId(idItem);
    dispatch(handleDeleteConversation({ id: idItem }));
    handleCloseItem();
  };
  const handleArchive = () => {
    dispatch(handleArchiveConversations({ idConver: idItem, archive: true }));
    handleCloseItem();
  };
  const handleChildClick = (e) => {
    // Ngăn sự kiện click lan truyền lên cha
    e.stopPropagation();
    setAnchorElItem(e.currentTarget);
    setIdItem(e.currentTarget.getAttribute('path-id'));
  };
  const handleDeleteAll = () => {
    dispatch(handleDeleteAllConversations());
  };
  const openAvatar = Boolean(anchorEl);
  const openItem = Boolean(anchorElItem);
  const idAvatar = openAvatar ? 'simple-popover' : undefined;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        height: '100vh',

        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        '& .MuiPaper-root': {
          backgroundColor: theme.palette.background.secondary,
          position: 'relative',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
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
      <DrawerHeader
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ref={heightLogoRef}
      >
        <div
          style={{
            padding: '0 16px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="/logo/fpt.png" height={40} alt="" />
        </div>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List
        sx={{
          height:  `calc(100% - ${heightLogo}px)`,
        }}
      >
        <List
          sx={{
            height: `calc(100% - ${heightAvatar}px)`,
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {nav.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                padding: theme.palette.padding.list,
              }}
            >
              <ListItemButton
                sx={{
                  margin: '4px 0',
                  borderRadius: '12px',
                  padding: '4px 8px',
                  color: item._id == id ? theme.palette.text.white : '#000',
                  backgroundColor:
										item._id == id
										  ? theme.palette.background.fpt
										  : 'transparent',
                  '&:hover .MuiListItemIcon-root': {
                    display: 'flex',
                    color: theme.palette.text.white,
                  },
                  '&:hover': {
                    backgroundColor:
											item._id == id
											  ? theme.palette.background.fptHover
											  : 'rgb(240, 241, 242)',
                  },
                }}
                onClick={() => navigate(`/chat/${item._id}`)}
              >
                <ListItemText primary={item.title} />
                <ItemIconCus
                  aria-describedby={idItem}
                  path-id={item._id}
                  onClick={handleChildClick}
                >
                  <MoreVertIcon />
                </ItemIconCus>
              </ListItemButton>
              <Popover
                id={idItem}
                open={openItem}
                anchorEl={anchorElItem}
                onClose={handleCloseItem}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiPopover-paper': {
                    borderRadius: '16px',
                    boxShadow: 'none',
                  },
                }}
              >
                <List
                  sx={{
                    width: '200px',
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
                          display: 'flex',
                        },
                      }}
                      onClick={handleArchive}
                    >
                      <ListItemText primary={'Lưu trữ'} />
                      <ItemIconCus>
                        <ArchiveIcon />
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
                          display: 'flex',
                        },
                      }}
                      onClick={handleDelete}
                    >
                      <ListItemText primary={'Xóa'} />
                      <ItemIconCus>
                        <DeleteIcon />
                      </ItemIconCus>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </ListItem>
          ))}
        </List>
        <Box
          ref={heightRef}
          sx={{
            width: drawerWidth,
            bottom: '0',
            left: '0',
            backgroundColor: theme.palette.background.secondary,
          }}
        >
          <Stack spacing={1}>
            <List>
              <ListItem>
                <ListItemButton
                  sx={{
                    borderRadius: '12px',
                    padding: '4px 8px',
                    backgroundColor: theme.palette.background.fpt,
                    color: theme.palette.text.white,
                    '& .MuiListItemIcon-root': {
                      display: 'flex',
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.background.fptHover,
                    },
                  }}
                  onClick={() => handleNavigate('/chat')}
                >
                  <ListItemText primary={'Cuộc trò chuyện mới'} />
                  <ItemIconCus sx={{ color: theme.palette.text.white }}>
                    <AddIcon />
                  </ItemIconCus>
                </ListItemButton>
              </ListItem>
              {!data?.isPro ? (
                <ListItem>
                  <ListItemButton
                    sx={{
                      borderRadius: '12px',
                      padding: '4px 8px',
                      '& .MuiListItemIcon-root': {
                        display: 'flex',
                      },
                    }}
                    onClick={() => handleNavigate('/plan')}
                  >
                    <ListItemText primary={'Nâng cấp PRO'} />
                    <ItemIconCus>
                      <FileUploadIcon />
                    </ItemIconCus>
                  </ListItemButton>
                </ListItem>
              ) : null}
              <ListItem>
                <ListItemButton
                  sx={{
                    borderRadius: '12px',
                    padding: '12px 8px',
                    '& .MuiListItemIcon-root': {
                      display: 'flex',
                    },
                  }}
                  aria-describedby={idAvatar}
                  onClick={handleClick}
                >
                  <ListItemText primary={data?.name} />
                  <ItemIconCus>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      badgeContent={
                        <ChipStatus>{data?.isPro ? 'PRO' : 'FREE'}</ChipStatus>
                      }
                    >
                      <Avatar alt={data?.name} src={data?.avatar} />
                    </Badge>
                  </ItemIconCus>
                </ListItemButton>
                <Popover
                  id={idAvatar}
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
                            display: 'flex',
                          },
                        }}
                      >
                        <ListItemText primary={'Tài khoản'} />
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
                            display: 'flex',
                          },
                        }}
                        onClick={() => handleDeleteAll()}
                      >
                        <ListItemText primary={'Xóa hết'} />
                        <ItemIconCus>
                          <DeleteIcon />
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
                            display: 'flex',
                          },
                        }}
                        onClick={() => handleLogout()}
                      >
                        <ListItemText primary={'Đăng xuất'} />
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
      </List>
    </Drawer>
  );
};
NavChat.protoType = {
  handleDrawerClose: PropTypes.func,
  open: PropTypes.bool,
};
export default NavChat;
