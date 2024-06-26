import React, { useMemo } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUser } from '~/redux/slices/authSlice';
import { UserContext } from '~/context/user.context';

const AuthLayout = ({ children }) => {
  const { setLogin } = React.useContext(UserContext);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);

  useMemo(() => {
    dispatch(handleGetUser());
  }, [dispatch]);
  useMemo(() => {
    if (status === 'success' && userState) {
      setLogin(true);
    }
  }, [status, userState, setLogin]);
  const location = useLocation();

  if (status === 'success') {
    return children;
  }
  if (status === 'failed') {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
};

export default AuthLayout;
