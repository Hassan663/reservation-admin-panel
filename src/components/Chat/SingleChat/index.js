import React, { useState, useEffect } from 'react';
import { Menu, Layout, Input, Card, Row, Col } from 'antd';
import './SingleChat.scss';
import { Tooltip } from 'antd';
import { setCurrentUserChat, singleChatUnseen } from '../../commonActions/FirebaseActions';
import adminChat from 'modules/adminChat/actions';
import { useDispatch } from 'react-redux';
import { IoPersonCircleOutline } from 'react-icons/io5';
const SingleChat = ({
  id,
  name,
  time,
  role,
  email,
  func,
  image,
  receiverinfo,
  setreceiverinfo,
  Status,
  setOpenStaffModel,
  setShowChatModel,
}) => {
  const dispatch = useDispatch();

  const [UnSeenCount, setUnSeenCount] = useState(0);
  let user = localStorage.getItem('userloggedin');
  useEffect(async () => {
    await singleChatUnseen(user, email, setUnSeenCount);
  }, []);
  return (
    <div
      className="singlechat_main_container"
      onClick={async () => {
        func(email);
        setreceiverinfo({ ...receiverinfo, name: name, role: role, email: email, type: 'chat' });
        // await setCurrentUserChat(id, email);
        // dispatch(adminChat.getSingleUserToken.request(id));
      }}
    >
      {' '}
      <div className="singlechat_inner_wrapper">
        <Tooltip placement="top" title="Last Seen: date & time">
          <Row>
            {/* <Tooltip placement="top" title="Online/Offline"> */}
            <Col className="singlechat_outer_box_col" span={5}>
              {image ? (
                <img src={image} alt="user-img" />
              ) : (
                <div>
                  <div
                    style={{
                      width: '43px',
                      height: '43px',
                      fontSize: '45px',
                      cursor: 'pointer',
                    }}
                  >
                    <IoPersonCircleOutline size={45} />
                  </div>
                </div>
              )}
              <div className={Status ? 'active_circle' : 'inActive_Circle'}></div>
            </Col>
            {/* </Tooltip> */}
            <Col span={19}>
              <Row style={{ height: '20px', paddingTop: '5px', paddingBottom: '5px' }}>
                <Col span={18} style={{ fontSize: '15px' }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Col>
                <Col span={6} style={{ fontSize: '12px', color: '#6986e8' }}>
                  {' '}
                  {Status ? 'Online' : 'Offline'}
                </Col>
              </Row>
              <Row
                style={{
                  height: '20%',
                  paddingTop: '8px',
                  color: 'rgb(192, 192, 192)',
                  fontSize: '13px',
                }}
              >
                <Col span={20}>{email}</Col>
                <Col span={4}>
                  {UnSeenCount !== 0 && (
                    <label
                      style={{
                        backgroundColor: '#764abc',
                        padding: '0px 7px 0px 7px',
                        borderRadius: '30%',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      {UnSeenCount}
                    </label>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Tooltip>
      </div>
    </div>
  );
};

export default SingleChat;
