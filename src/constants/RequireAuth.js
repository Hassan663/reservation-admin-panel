import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireAuth = props => {
  const { CompInner, allowedRoles, children } = props;
  const location = useLocation();

  // useEffect(() => {
  //   if (userData?.role === 'admin') {
  //     console.log('user');
  //     navigate('/dashboard');
  //   }
  // }, [userData]);
  return <>{children}</>;
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
export default RequireAuth;
