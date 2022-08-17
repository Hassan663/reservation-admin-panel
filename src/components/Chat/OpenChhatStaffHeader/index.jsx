import React from 'react';
import './OpenChatStaffHeader.scss';
import { BsFillVolumeUpFill } from 'react-icons/bs';
import { Tooltip } from 'antd';
import { IoPersonCircleOutline } from 'react-icons/io5';
const OpenChatStaffHeader = ({ receiverinfo, openStaffModel, setOpenStaffModel, image }) => {
  return (
    <div className="openchat_staff_header_mian_container">
      <div className="leftside_openchat_header_main_wrapper">
        <div className="profile_pic_vol_wrapper">
          {image ? (
            <img src={image} alt="profile-pic" />
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
                }}
              >
                <div> {receiverinfo.name[0].toUpperCase()}</div>
              </div> */}
            </div>
          )}

          <div className="vol_icon_wrapper">
            <Tooltip placement="top" title="Sound Notificatios">
              <BsFillVolumeUpFill color="white" size={15} />
            </Tooltip>
          </div>
        </div>
        <div className="usr_name_role_wrapper">
          <h4>{receiverinfo.name}</h4>
          <span>{receiverinfo.role}</span>
        </div>
      </div>
      <div
        className="rightside_openchat_header_main_wrapper"
        onClick={() => setOpenStaffModel(!openStaffModel)}
      >
        {/* <Tooltip placement="left" title="Shared files">
          <svg
            data-toggle="tooltip"
            data-container="body"
            title=""
            data-placement="left"
            className="fa fa-share-alt"
            id="shared_user_files"
            viewBox="0 0 24 24"
            data-original-title="Shared files"
          >
            <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3"></path>
          </svg>
        </Tooltip> */}
      </div>
    </div>
  );
};

export default OpenChatStaffHeader;
