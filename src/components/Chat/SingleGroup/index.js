import React, { useEffect, useState } from 'react';
import './SingleGroup.scss';
import { useDispatch } from 'react-redux';
import {
  setCurrentUserChat,
  getSingleGroupUnseen,
  DeleteGroupSeenMessage,
} from '../../commonActions/FirebaseActions';
import adminAction from '../../../modules/adminChat/actions';
import { Row, Col } from 'antd';
import { GrGroup } from 'react-icons/gr';
import { MdOutlineGroups } from 'react-icons/md';
const SingleGroup = ({ groupname, id, setShowChatModel, receiverinfo, setreceiverinfo, image }) => {
  const dispatch = useDispatch();
  const [unseenCount, setUnseenCount] = useState();
  useEffect(() => {
    getSingleGroupUnseen(id, setUnseenCount);
  }, []);

  return (
    <div
      className="Sgorup_main_container"
      onClick={() => {
        // alert(id);
        setCurrentUserChat(id, id);
        DeleteGroupSeenMessage(id);
        dispatch(adminAction.setconnectionId.request(id));
        setShowChatModel(true);
        setreceiverinfo({ ...receiverinfo, name: groupname, type: 'group', email: id });
        dispatch(adminAction.getGroupWithId.request(id));
        dispatch(adminAction.getcurrentGroupUsersIds.request(id));
      }}
    >
      <div className="Sgorup_inner_container">
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col className="single_card_wrapper_Sgroup" span={5}>
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
                  <MdOutlineGroups size={45} fill={'white'} />
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
                  }}
                >
                  {groupname[0].toUpperCase()}
                </div> */}
              </div>
            )}
          </Col>
          <Col span={19}>
            <Row>
              <Col
                span={16}
                style={{
                  fontSize: '15px',
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  color: '#fff',
                }}
              >
                {groupname.charAt(0).toUpperCase() + groupname.slice(1)}{' '}
                {'  ' + unseenCount > 0 && unseenCount}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SingleGroup;
