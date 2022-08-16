import React from 'react';
import './OpenChatClientHeader.scss';

const OpenChatClientHeader = () => {
  return (
    <div className="open_chat_client_header_main_container">
      <div className="lft_side_client_wrapper">
        <h4>Contact:</h4>
        <span>Muhammad Usman</span>
      </div>
      <div className="right_side_client_wrapper">
        <h4>Customer:</h4>
        <div className="grp_name_wrapper">
          <strong>Group Name</strong>
        </div>
      </div>
    </div>
  );
};

export default OpenChatClientHeader;
