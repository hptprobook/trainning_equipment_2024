import { Button, Card } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './style.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAccessTokenGit, handleGetUserGit } from '~/redux/slices/authSlice';
const LoginView = () => {
  const CLIENT_ID = '8edcd9a10c24432f67cb';
  const BASE_URL = 'http://localhost:8000/api/account';
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const tokenGit = useSelector((state) => state.auth.tokenGit);
  const userGit = useSelector((state) => state.auth.userGit);
  useEffect(() => {
    dispatch(handleGetAccessTokenGit(code));
  }, [code, dispatch]);
  useEffect(() => {
    if (tokenGit) {
      localStorage.setItem('token', tokenGit.token);
      dispatch(handleGetUserGit());
    }
  }, [tokenGit]);
  useEffect(() => {
    console.log(userGit);
  }, [userGit]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const codeParams = new URLSearchParams(window.location.search).get(
  //         'code'
  //       );
  //       if (codeParams) {
  //         const {
  //           data: { token },
  //         } = await axios.get(
  //           `${BASE_URL}/getAccessTokenGit?code=${codeParams}`
  //         );
  //         if (token) {
  //           const { data: dataUser } = await axios.get(
  //             `${BASE_URL}/getUserGit`,
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             }
  //           );
  //           if (dataUser) {
  //             const response = await axios.post(`${BASE_URL}/addUserFromGit`, {
  //               name: dataUser.name,
  //               avatar: dataUser.avatar_url,
  //               idGit: dataUser.id,
  //             });
  //             console.log(response.data);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const run = async () => {
  //     const tokenUser =
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHVodjUiLCJpZEdpdCI6MTI2NDk1ODcwLCJpYXQiOjE3MTA4NTAwMDYsImV4cCI6MTcxMzQ0MjAwNn0.DmoZbw86a24eKONVfR8Y4HKFOfz3jNZnW7M59IaHCVc';
  //     const dataUser = await axios.get(`${BASE_URL}/getUser`, {
  //       headers: {
  //         'auth-token': tokenUser,
  //       },
  //     });
  //     console.log(dataUser);
  //   };
  //   run();
  // }, []);

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