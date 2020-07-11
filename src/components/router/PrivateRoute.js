import { navigate } from 'gatsby';
import React, { memo, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import LoadingScreen from './LoadingScreen';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    navigate('/');
    return null;
  }

  return <Component user={user} {...props} />;
};

export default memo(PrivateRoute);
