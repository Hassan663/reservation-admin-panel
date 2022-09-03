import React, { useState, useEffect, useContext } from 'react';
import { FaShare } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import defaultAdmin from '../../../../../assets/images/profile_placeholder.png';
import { USERS_BASE_URL } from 'constants/config/config.dev';
import {
  Layout,
  Input,
  Menu,
  Dropdown,
  Space,
  Button,
  message,
  Skeleton,
  List,
  Badge,
  Avatar,
  Divider,
  Typography,
} from 'antd';
import {
  BellOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import authActions from 'modules/auth/actions';
// import { unregister } from './registerServiceWorker';
import './HeaderIcons.scss';
import { SocketContext } from 'constants/context/socket';
import { Search } from 'components/Common';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ORIGIN } from 'constants/config/config.dev';
import ClientChat from 'components/ClientChat';
const host = window.location.origin;

const HeaderIcons = ({ showChat, setShowChat }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async obj => {
    // if (obj === 'Logout') {
    // inActiveStatus();
    // dispatch(
    //   AdminChatActions.deleteToken.request({
    //     id: localStorage.getItem('tokenid'),
    //     userId: localStorage.getItem(`${ORIGIN}_uid`),
    //   })
    // );
    // dispatch({ type: 'LOGOUT', payload: {} });
    // navigate('/admin/login');
    // alert('call out!');
    // } else if (obj === 'My Profile') {
    //   dispatch({ type: 'MY_PROFILE', payload: {} });
    //   navigate('/dashboard/myprofile');
    // } else if (obj === 'Edit Profile') {
    //   dispatch({ type: 'EDIT_PROFILE', payload: {} });
    //   navigate('/dashboard/edit_admin_profile');
    // }
    dispatch(authActions.signout.request());
  };

  const menuProfile = (
    <Menu>
      {
        // ['My Profile', 'My Timesheets', 'Edit Profile', 'Logout']
        ['Logout'].map(obj => (
          <Menu.Item onClick={() => handleLogout(obj)}>{obj}</Menu.Item>
        ))
      }
    </Menu>
  );
  const menuStatus = (
    <Menu style={{ backgroundColor: '#51647c' }}>
      {[
        { name: 'Online', color: 'green' },
        { name: 'Away', color: 'yellow' },
        { name: 'Busy', color: 'red' },
        { name: 'Offline', color: 'grey' },
      ].map(obj => (
        <Menu.Item style={{ backgroundColor: '#51647c' }}>
          <Badge color={obj.color}></Badge>
          <span style={{ color: 'white' }}>{obj.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
  const menuTimer = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '15px',
        border: '1px solid #cfc7c7d9',
        background: 'white',
        width: '320px',
        marginTop: '20px',
      }}
    >
      <h3>No started timers found</h3>
      <Divider />
      <Button style={{ backgroundColor: '#07cc04', width: '160px', height: '45px' }}>
        {' '}
        <ClockCircleOutlined /> Start Timer{' '}
      </Button>
      <h4>View all timesheets</h4>
    </div>
  );

  let ReadCounter = 0;

  const menuNotif = (
    <Menu>
      <Menu.Item>
        <div className="mainNotif">
          <div className="read_msg">
            <h3 style={{ color: 'white', paddingRight: '5px' }}>Mark all as read</h3>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="HeaderRight">
      <div className="Spacing" size="large">
        <Dropdown className="icons" overlay={menuProfile} placement="bottom">
          <Avatar
            style={{ height: '30px', width: '30px' }}
            // src={staff?.photoPath ? `${USERS_BASE_URL}/uploads/${staff?.photoPath}` : defaultAdmin}
            size="medium"
          ></Avatar>
        </Dropdown>

        <Badge className="icons" size={'small'} count={'5'}>
          <CheckSquareOutlined
            style={{ color: '#764abc ', marginTop: '2px' }}
          ></CheckSquareOutlined>
        </Badge>

        {/* <Dropdown className="icons" trigger={'click'} overlay={menuNotif} placement="bottom"> */}
        {/* <Badge className="icons" size={'small'} count={'5'}>
          <BellOutlined
            className="headerBtn"
            onClick={() => {
              // setShowChat(!showChat);
            }}
          />
        </Badge> */}

        {/* </Dropdown> */}
      </div>
    </div>
  );
};

export default HeaderIcons;
