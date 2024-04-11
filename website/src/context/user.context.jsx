import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUser } from '~/redux/slices/authSlice';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const value = useMemo(
    () => ({ user, setUser, login, setLogin }),
    [user, setUser, login, setLogin]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { UserContext, UserProvider };
