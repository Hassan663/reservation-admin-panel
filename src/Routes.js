import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Routes as Switch, Navigate, Route, HashRouter, useLocation } from 'react-router-dom';
import { Login, SignUp, AccessDenied, NotFound, Forgot, Menu, Question } from './components';
const Routes = withRouter(({ location }) => {
  const [split, setSplit] = useState('');

  setInterval(() => {
    const splitUrlIndex = window.location.href.lastIndexOf('/');
    const splitUrl = window.location.href.slice(splitUrlIndex + 1);
    setSplit(splitUrl);
  }, 1000);
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div>
      <HashRouter
        getUserConfirmation={(message, callback) => {
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}
      >
        <Switch>
          <Route path="/" element={<Navigate to="/menu" />} />
          <Route path="/menu" element={<Menu />} />
          <Route element={<Login />} path="/Login"></Route>
          <Route element={<SignUp />} path="/SignUp"></Route>
          <Route element={<Forgot />} path="/Forgot"></Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Switch>
      </HashRouter>
    </div>
  );
});

export default Routes;
