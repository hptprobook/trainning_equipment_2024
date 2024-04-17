import { Button, Card } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './style.css';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUser, handleGetUserGit } from '~/redux/slices/authSlice';
import { handleToast } from '../../config/toast';
import { UserContext } from '~/context/user.context';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const { login, setLogin } = React.useContext(UserContext);
  const gitError = queryParams.get('error');
  const tokenGit = useSelector((state) => state.auth.tokenGit);
  const userGit = useSelector((state) => state.auth.userGit);
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);
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
      localStorage.setItem('token', tokenGit.addUser.tokenUser);
      dispatch(handleGetUser());
    }
  }, [tokenGit, status, dispatch]);
  useEffect(() => {
    if (userGit) {
      handleToast('success', 'Đăng nhập thành công!');
      setLogin(true);
      localStorage.setItem('token', userGit.dataUser.curentToken);
      navigate('/chat');
    }
  }, [userGit, navigate, setLogin]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (login) {
      navigate('/chat');
    }
    // if (token) {
    //   navigate('/chat');
    // }
  }, [login, navigate, token]);
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
      <h2 className="logo">
        <img src="./logo/fpt.png" height={50} alt="" />
      </h2>
      <div className="content f-col">
        <h2 className="title ml">Bee AI</h2>
        <p className="context ml">
					Công cụ hỗ trợ tốt nhất dành cho giảng viên và sinh viên CNTT
        </p>
      </div>
      <div className="login f-col">
        <div style={{
          marginBottom: '40px',
        }}>
          <img src="./logo/logoWhite.png" height={82} width={108} alt="" />
        </div>
        <h2 className="title">Đăng nhập</h2>
        <div className="button">
          <Button
            size="large"
            sx={{
              width: 'fit-content',
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: 'rgb(31, 179, 74)',
              color: 'rgba(255,255,255,1)',
              padding: '8px 24px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(31, 179, 74, 0.9)',
              },
            }}
            onClick={handleLoginGit}
          >
						Đăng nhập với GitHub
            <GitHubIcon
              sx={{
                marginLeft: '10px',
              }}
            />
            {/* <Iconify icon="eva:google-fill" color="#DF3E30" /> */}
          </Button>
        </div>
        <div className="footer">
          <a href="https://www.facebook.com/beeittaynguyen">Make by Xuong Thuc Hanh FPT Polytechic</a>
          {/* <a href="fb.com">Liên hệ</a> */}
        </div>
      </div>
    </div>
  );
};

export default LoginView;
