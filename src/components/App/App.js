import React, { Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import WebFont from 'webfontloader';
import Routes from '../../Routes';
// import { DEFAULT_META_DESCRIPTION, DEFAULT_META_KEYWORDS } from '../../constants';
import './App.scss';
import 'animate.css';
import 'rc-color-picker/assets/index.css';
import authActions from 'modules/auth/actions';
import { useDispatch } from 'react-redux';
import 'react-notifications/lib/notifications.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(adminChat.deleteToken.request(localStorage.getItem('tokenid')));
    dispatch(authActions.signout.request({}));
  };
  const doInactive = () => {
    handleLogOut();
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins', 'Bebas Neue'],
      },
    });
  }, []);


  return (
    // <SocketContext.Provider value={socket}>
    <Layout>
      <Helmet>
        <title>Reservation Web</title>
      </Helmet>
      <Content className="overallContent">
        {/* <ErrorBoundary> */}
        <Suspense >
          {/* <TimelineProvider> */}

          <Routes />
          {/* </TimelineProvider> */}
        </Suspense>
        {/* </ErrorBoundary> */}
      </Content>
    </Layout>
    // </SocketContext.Provider>
  );
};

export default App;
