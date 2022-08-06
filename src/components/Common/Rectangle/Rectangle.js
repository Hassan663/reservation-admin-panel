import React from 'react';
import PropTypes, { array } from 'prop-types';
import './Rectangle.scss';
import chatLogo from 'assets/images/Group6.png';
import toggler from 'assets/images/toggler.png';
import logo from 'assets/images/logo.png';
import { Image, Typography } from 'antd';
import Card from '../Card';
const Rectangle = props => {
  const { title, Array, content, bg, ...rest } = props;

  return (
    <>
      <div className="event_wrapper" style={{backgroundImage: `url(${bg})` }}>
        <div className="logoWrapper">
          <img className="logo" width={75} height={75} src={logo}></img>
        </div>
        <div className="rectangleWrapper">
          <div className="rectangleBorder">
            <div className="header_area">
              <Typography>{title}</Typography>
            </div>
            {content}
          </div>
        </div>
      </div>
    </>
  );
};
Rectangle.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
};

export default Rectangle;
 {/* <div className="event_header">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img className="toggler" src={toggler}></img>
            <img className="toggler" src={toggler}></img>
            <img className="toggler" src={toggler}></img>
          </div>
          <img width={75} height={30} src={chatLogo}></img>
        </div> */}