import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Chatting from './Chatting';
import OpenChat from './OpenChat';
import './Chat.scss';
import { getOnlineUsers, setCurrentUserChat } from '../commonActions/FirebaseActions';
import { ORIGIN } from 'constants/config/config.dev';
import { SocketContext,socket } from 'constants/context/socket';
const Chat = () => {
  const [showchatmodel, setShowChatModel] = useState(false);
  const [receiverinfo, setreceiverinfo] = useState({
    name: '',
    role: '',
    email: '',
    type: '',
  });
  const [usersLogin, setUsersLogin] = useState([]);
  const socket = useContext(SocketContext);
  const [openGroupModel, setOpenGroupModel] = useState(false);
  const [openStaffModel, setOpenStaffModel] = useState(false);
  useEffect(() => {
    localStorage.setItem(
      'userloggedin',
      JSON.parse(localStorage.getItem(`${ORIGIN}_user`))?.user?.email
    );
    return () => {
      // setCurrentUserChat('', '');
    };
  }, []);

  return (
    <Row className="chattingmodule">
        <SocketContext.Provider value={socket}>
      <Col span={8} className="chatting_module_inner_wrapper">
        <Chatting
          setShowChatModel={setShowChatModel}
          receiverinfo={receiverinfo}
          setreceiverinfo={setreceiverinfo}
          openGroupModel={openGroupModel}
          setOpenGroupModel={setOpenGroupModel}
          openStaffModel={openStaffModel}
          setOpenStaffModel={setOpenStaffModel}
          socket={socket}
        />
      </Col>
      <Col span={16}>
        {showchatmodel ? (
          <OpenChat
            receiverinfo={receiverinfo}
            setreceiverinfo={setreceiverinfo}
            openGroupModel={openGroupModel}
            setOpenGroupModel={setOpenGroupModel}
            openStaffModel={openStaffModel}
            setOpenStaffModel={setOpenStaffModel}
            setShowChatModel={setShowChatModel}
          socket={socket}
          />
        ) : (
          ''
        )}
      </Col>
        </SocketContext.Provider>
    </Row>
  );
};

export default Chat;
