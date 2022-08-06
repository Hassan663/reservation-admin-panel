import React, { Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import WebFont from 'webfontloader';
import Routes from '../../Routes';
import { DEFAULT_META_DESCRIPTION, DEFAULT_META_KEYWORDS } from '../../constants';
import './App.scss';
import 'animate.css';
import 'rc-color-picker/assets/index.css';
import { ErrorBoundary, LoadingPage } from '../Common';
import authActions from 'modules/auth/actions';
import { useDispatch } from 'react-redux';
import { inactivity_time } from '../../constants/options';
import 'react-notifications/lib/notifications.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();

  var timeoutInMiliseconds = inactivity_time;
  var timeoutId;

  const startTimer = () => {
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
  };
  const resetTimer = () => {
    window.clearTimeout(timeoutId);
    startTimer();
  };
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

  const setupTimers = () => {
    document.addEventListener('mousemove', resetTimer, false);
    document.addEventListener('mousedown', resetTimer, false);
    document.addEventListener('keypress', resetTimer, false);
    document.addEventListener('touchmove', resetTimer, false);
    startTimer();
  };
  useEffect(() => {
    setupTimers();
  });

  return (
    // <SocketContext.Provider value={socket}>
    <Layout>
      <Helmet>
        <title>Reservation Web</title>
        <meta name="description" content={DEFAULT_META_DESCRIPTION} />
        <meta name="keywords" content={DEFAULT_META_KEYWORDS} />
      </Helmet>
      <Content className="overallContent">
        {/* <ErrorBoundary> */}
        <Suspense fallback={<LoadingPage />}>
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
