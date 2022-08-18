import React, { useEffect, useState, useRef } from 'react';
import { Menu, Layout, Input, Card, Row, Col, Modal, Select, Typography, Space } from 'antd';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { RiGroupLine } from 'react-icons/ri';
import { TiGroup } from 'react-icons/ti';
import { MdPersonSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import './Chatting.scss';
import SingleChat from '../SingleChat';
import { UserAddOutlined } from '@ant-design/icons';
import SingleGroup from '../SingleGroup';
import SingleCompany from '../SingleCompany';
import Label from 'components/Common/Label';
import { db, Storage } from '../../../constants/config/FirebaseConnection';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  limit,
  updateDoc,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import AdminChatActions from 'modules/adminChat/actions';
import { Tooltip } from 'antd';

import './Chatting.scss';
import {
  createGroup,
  getOnlineUsers,
  getUnseenMessageCount,
} from '../../commonActions/FirebaseActions/index';
import { ORIGIN } from 'constants/config/config.dev';
import { Link } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
let user = localStorage.getItem('userloggedin');

const Chattings = ({ setOpenStaffModel, setShowChatModel, receiverinfo, setreceiverinfo }) => {
  const dispatch = useDispatch();
  const [stafchat, setStaffChat] = useState(true);

  const [showHeader, setShowHeader] = useState('');
  const [conversation, setConversation] = useState([
    {
      firstName: 'Mohsin',
      lastName: 'Ali',
      email: 'Mohsin@gmail.com',
    },
    {
      firstName: 'Muneeb',
      lastName: 'Ali',
      email: 'Muneeb@gmail.com',
    },
  ]);
  const [usersLogin, setUsersLogin] = useState([]);

  useEffect(() => {
    getOnlineUsers(setUsersLogin); // getting online users from firebase
  }, []);

  // const SearchItems = e => {
  //   const inputvalue = e.target.value.toLowerCase();
  //   if (inputvalue != '') {
  //     const result = staffs.filter(user => {
  //       return user.firstName.toLowerCase().startsWith(inputvalue);
  //     });
  //     setConversation(result);
  //   } else {
  //     setConversation(staffs);
  //   }
  // };
  const getUserEmail = input => {
    console.log('input');
    // currentchat receiver
    dispatch(AdminChatActions.checkUserConnection.success(input));
    // dispatch(
    //   AdminChatActions.checkUserConnection.request([localStorage.getItem('userloggedin'), input])
    // );
    localStorage.setItem('messageReceiver', input);
    setShowChatModel(true);
  };

  return (
    <>
      <div className="chatting_sidebar_main_container">
        <Header className="header_container">
          <img src="pic.png" alt="person" />
          <span>Admin Chat</span>
        </Header>
        <div className="input_main_wrapper">
          <MdPersonSearch
            color="#eceaea"
            fontSize="20px"
            style={{ position: 'absolute', left: '24px' }}
          />
          <Tooltip placement="top" title="Search...">
            <input
              type="search"
              placeholder="Search members..."
              // onChange={SearchItems}
            />
          </Tooltip>
        </div>
      </div>

      {stafchat ? (
        <>
          <div className="admin_chat_side_inner_wrapper_u">
            <div style={{ overflowY: 'auto', height: '100%' }}>
              {conversation.map((user, index) => {
                return (
                  <SingleChat
                    id={user._id}
                    key={index}
                    role={user.role}
                    time={user.time}
                    email={user.email}
                    image={user.img}
                    func={getUserEmail}
                    receiverinfo={receiverinfo}
                    headerInfo={showHeader}
                    setreceiverinfo={setreceiverinfo}
                    name={user.firstName + ' ' + user.lastName}
                    Status={usersLogin.includes(user.email)}
                    setOpenStaffModel={setOpenStaffModel}
                    setShowChatModel={setShowChatModel}
                  />
                );
              })}
            </div>
          </div>
          {/* <div className="footer_staff_wrapper">
            <div className="footer_left_wrapper_staff">
              <svg viewBox="0 0 24 24">
                <path d="M19,3H14V5H19V18L14,12V21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10,18H5L10,12M10,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H10V23H12V1H10V3Z"></path>
              </svg>
              <span>Theme</span>
            </div>
            <Link className="footer_right_wrapper_staff" to="/dashboard/settings/chat-setting">
              <svg viewBox="0 0 24 24">
                <path d="M11 24H13V22H11V24M7 24H9V22H7V24M15 24H17V22H15V24M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.11 18 22 17.11 22 16V4C22 2.9 21.11 2 20 2M20 16H6L4 18V4H20"></path>
              </svg>
              <span>Settings</span>
            </Link>
          </div> */}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Chattings;
