import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Routes as Switch, Navigate, Route, HashRouter, useLocation } from 'react-router-dom';
import {
  Login,
  SignUp,
  AccessDenied,
  NotFound,
  Forgot,
  Menu,
  Question,
  AddProduct,
  AddEvent,
} from './components';
import AddCategory from 'components/AddCategory';
import AddBlog from 'components/AddBlog';
import Chat from './components/Chat';
import Main from './layouts/Main/Main';
const Routes = withRouter(({ location }) => {
  const [split, setSplit] = useState('');

  setInterval(() => {
    const splitUrlIndex = window.location.href.lastIndexOf('/');
    const splitUrl = window.location.href.slice(splitUrlIndex + 1);
    setSplit(splitUrl);
  }, 1000);

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
          <Route
            path="/menu"
            element={
              <Main>
                <Menu />
              </Main>
            }
          />
          <Route
            path="/addProduct"
            element={
              <Main>
                <AddProduct />
              </Main>
            }
          />
          <Route
            path="/addCategory"
            element={
              <Main>
                <AddCategory />
              </Main>
            }
          />
          <Route
            path="/addBlog"
            element={
              <Main>
                <AddBlog />
              </Main>
            }
          />
          <Route
            path="/addEvent"
            element={
              <Main>
                <AddEvent />
              </Main>
            }
          />
          <Route
            path="/adminChat"
            element={
              <Main>
                <Chat />
              </Main>
            }
          />
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
