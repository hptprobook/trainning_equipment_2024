// import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginView from './LoginView';
import useAuth from '~/customHooks/useAuth';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const isAuth = useAuth();

  if (isAuth) {
    return <Navigate to="/compiler" />;
  }

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <LoginView />
    </>
  );
};

export default LoginPage;
