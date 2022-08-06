import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AclService from 'services/acl';
import { getUser, getUserId } from './utils';

export const PrivateRoute = ({ component: Component, layout: Layout, path }) => {
  const user = getUser();
  const role = user?.user?.role?.toLowerCase();
  const aclService = new AclService(role);
  const permitted = aclService.hasPermission(path);
  const redirect = aclService.redirectUrl;
  const isAuthenticated = true;

  return (
    <PrivateRoute
      render={props => {
        return isAuthenticated && permitted ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Navigate
            to={{
              pathname: redirect,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const user = getUser();
  const role = user?.user?.role?.toLowerCase();
  const aclService = new AclService(role);
  const isAuthenticated = !!getUserId();
  return (
    <PublicRoute
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Navigate to={aclService.landingPage} />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};
