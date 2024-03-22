import { Button, Card } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './style.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUser, handleGetUserGit } from '~/redux/slices/authSlice';
import { handleToast } from '../../config/toast';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const gitError = queryParams.get('error');
  const tokenGit = useSelector((state) => state.auth.tokenGit);
  const userGit = useSelector((state) => state.auth.userGit);
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== null) {
      navigate('/chat');
    }
  }, [token, navigate]);
  useEffect(() => {
    if (code) {
      dispatch(handleGetUserGit(code));
    }
    if (gitError) {
      handleToast('error', 'Đăng nhập thất bại!');
    }
  }, [code, gitError, dispatch]);
  useEffect(() => {
    if (tokenGit && status === 'success') {
      localStorage.setItem('git_token', tokenGit.addUser.tokenUser);
      // dispatch(resetState());
      setTimeout(() => {
        dispatch(handleGetUser());
      }, 1000);
    }
  }, [tokenGit, status, dispatch]);
  useEffect(() => {
    if (userGit) {
      handleToast('success', 'Đăng nhập thành công!');
      localStorage.setItem('token', userGit.dataUser.curentToken);
      navigate('/chat');
    }
  }, [userGit, navigate]);
  useEffect(() => {
    if (error) {
      handleToast('error', error);
    }
  }, [error]);
  const handleLoginGit = (e) => {
    e.preventDefault();
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };
  return (
    <div className="login-container">
      <h2 className='logo'>Support Learning IT</h2>
      <div className="content f-col">
        <h2 className="title ml">Support Learning IT</h2>
        <p className='context ml'>
          Công cụ hỗ trợ tốt nhất dành cho sinh viên IT
        </p>
      </div>
      <div className="login f-col">
        <h2 className='title'>Đăng nhập</h2>
        <div className="button">
          <Button
            size="large"
            sx={{
              width: 'fit-content',
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: 'rgba(60, 70, 255)',
              color: 'rgba(255,255,255,1)',
              padding: '8px 24px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgb(0, 0, 255)',
              },
            }}
            onClick={handleLoginGit}
          >
            Đăng nhập với GitHub
            <GitHubIcon
              sx={{
                marginLeft: '10px',
              }} />
            {/* <Iconify icon="eva:google-fill" color="#DF3E30" /> */}
          </Button>
        </div>
        <div className="footer">
          <a href="fb.com">Điều khoản và dịch vụ</a>
          <a href="fb.com">Liên hệ</a>
        </div>
      </div>
    </div>
  );
};

export default LoginView;