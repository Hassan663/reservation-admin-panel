import React, { useState, useEffect } from 'react';
import { Menu, Layout, Input, Card, Row, Col } from 'antd';
import './SingleClient.scss';
// import '../../../theme/base.scss';
import AdminChatActions from 'modules/adminChat/actions';
import { setCurrentUserChat, singleChatUnseen } from '../../commonActions/FirebaseActions';
import { useDispatch } from 'react-redux';
import { IoPersonCircleOutline } from 'react-icons/io5';
const index = ({
  id,
  name,
  role,
  setShowChatModel,
  email,
  image,
  receiverinfo,
  setreceiverinfo,
  Status,
  compnayMessageCount,
  setCompanyMessageCount,
}) => {
  const dispatch = useDispatch();
  const [UnSeenCount, setUnSeenCount] = useState(0);
  let user = localStorage.getItem('userloggedin');
  useEffect(async () => {
    await singleChatUnseen(user, email, setUnSeenCount);
  }, []);

  return (
    <div
      className="singlechat"
      onClick={async () => {
        dispatch(
          AdminChatActions.checkUserConnection.request([
            localStorage.getItem('userloggedin'),
            email,
          ])
        );
        dispatch(AdminChatActions.getSingleUserToken.request(id));
        setShowChatModel(true);
        setreceiverinfo({ ...receiverinfo, name: name, role: role, email: email, type: 'chat' });
        localStorage.setItem('messageReceiver', email);
        await setCurrentUserChat(id, email);
      }}
    >
      <div className="client_group_members_details_wrapper">
        <Row>
          <Col className="client_group_members_details_inner_wrapper" span={5}>
            {image ? (
              <img src={image} alt="user-img" />
            ) : (
              <div>
                <div
                  style={{
                    width: '43px',
                    height: '43px',
                    fontSize: '50px',
                    cursor: 'pointer',
                  }}
                >
                  <IoPersonCircleOutline size={45} />
                </div>
                {/* <div
                  style={{
                    width: '43px',
                    height: '43px',
                    background: 'orange',
                    borderRadius: '50%',
                    fontSize: '35px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    paddingTop: '5px',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                  }}
                >
                  {name[0].toUpperCase()}
                </div> */}
              </div>
            )}

            <div
              className={Status ? 'circle_wrapper_client_green' : 'circle_wrapper_client_grey'}
            ></div>
          </Col>
          <Col span={19}>
            <Row style={{ height: '20px', paddingTop: '5px', paddingBottom: '5px' }}>
              <Col style={{ fontSize: '15px' }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Col>
            </Row>
            <Row style={{ height: '20%', paddingTop: '8px', justifyContent: 'space-between' }}>
              <Col span={20}>Role : {role}</Col>
              <Col span={4}>
                {UnSeenCount !== 0 && (
                  <label
                    style={{
                      backgroundColor: '#764abc',
                      padding: '0px 7px 0px 7px',
                      borderRadius: '50%',
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
      </div>
    </div>
  );
};

export default index;
