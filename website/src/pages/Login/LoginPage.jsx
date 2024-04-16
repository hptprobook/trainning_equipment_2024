// import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginView from './LoginView';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>
             Đăng nhập
        </title>
      </Helmet>
      <LoginView/>
    </>
  );
};

export default LoginPage;