import { Button, Card } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './style.css';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUser, handleGetUserGit } from '~/redux/slices/authSlice';
import { handleToast } from '../../config/toast';
import { UserContext } from '~/context/user.context';
import './login.css';
import LoginGG from './LoginGG';
import { TypeAnimation } from 'react-type-animation';
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
  const from = location.state?.from;
  useEffect(() => {
    if (from) {
      localStorage.setItem('history', JSON.stringify(from.pathname));
    }
  }, [from]);

  useEffect(() => {
    const run = async () => {
      if (code) {
        dispatch(handleGetUserGit(code));
      }
      if (gitError) {
        handleToast('error', 'Đăng nhập thất bại!');
      }
    };
    run();
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
      const history = JSON.parse(localStorage.getItem('history'));
      if (history) {
        localStorage.removeItem('history');
        navigate(history);
      } else {
        navigate('/');
      }
      // if(from) {
      //   navigate(from.pathname);
      // }
      // else {
      // navigate('/');
      // }

    }
  }, [userGit, navigate, setLogin]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (login && !from) {
      navigate('/chat');
    }
  }, [login, navigate, token, from]);
  useEffect(() => {
    if (error) {
      handleToast('error', 'Bạn cần đăng nhập để sử dụng tính năng này!');
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
        <img src="./logo/fpt-white.png" height={60} alt="" />
      </h2>
      <div className="content f-col">
        <h2 className="title ml">BEE AI</h2>
        {/* <p className="context ml">
          Công cụ hỗ trợ tốt nhất dành cho giảng viên và sinh viên CNTT
        </p> */}
        <TypeAnimation
          className="context ml"
          sequence={[
            'Công cụ hỗ trợ tốt nhất dành cho Giảng viên CNTT',
            1000,
            'Công cụ hỗ trợ tốt nhất dành cho Sinh viên CNTT',
            1000,
            'Tự động tối ưu mã nguồn',
            1000,
            'Tăng hiệu suất học tập',
            1000,
          ]}
          speed={40}
          style={{ fontSize: '2em' }}
          repeat={Infinity}
        />
      </div>
      <div className="login f-col">
        <div
          style={{
            marginBottom: '40px',
          }}
        >
          <img src="./logo/logoWhite.png" height={82} width={108} alt="" />
        </div>
        <h2 className="title">Đăng nhập</h2>
        <div className="button">
          <Button
            size="large"
            sx={{
              width: '300px',
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
          <div>
            <LoginGG />
            {/* <button type="button" className="login-with-google-btn">
              Sign in with Google
            </button> */}
          </div>
        </div>
        <div className="footer">
          <a href="https://www.facebook.com/beeittaynguyen" target="_blank">
          Copyright © FPT Polytechnic Tây Nguyên 2024
          </a>
          {/* <a href="fb.com">Liên hệ</a> */}
        </div>
      </div>
    </div>
  );
};

export default LoginView;
