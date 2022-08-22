import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
function PrivateRoute({ children }) {
  const host = window.location.origin;
  const user = window.localStorage[`${host}_token`];
  return user ? <Outlet /> : <Navigate to="/question" />;
}

export default PrivateRoute;
