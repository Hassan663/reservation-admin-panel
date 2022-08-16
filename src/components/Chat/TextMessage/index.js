import React, { useEffect, useRef } from 'react';
import '../../../theme/base.scss';
import './TextMessage.scss';
import { Tooltip } from 'antd';
import { USERS_BASE_URL } from '../../../constants/config/config.dev';
import { BiCheckDouble } from 'react-icons/bi';
import { IoIosCheckmark } from 'react-icons/io';
const TextMessage = ({ name, text, time, file, sender, loggedin, seen }) => {
  const checkFileExtension = name => {
    var allowedExtensions = /(\.apng|\.avif|\.webp|\.pjp|\.pjpeg|\.gif|\.svg|\.png|\.jpeg|\.jpg)$/i;
    if (allowedExtensions.exec(name)) {
      return true;
    }
  };

  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();
  useEffect(() => {
    executeScroll();
  }, []);

  return (
    <>
      <div ref={myRef} className="textarea_main_container">
        {/* <div className="time_main_wrapper">
          <span>Mon, Feb 7, 2022 8:53 AM</span>
        </div> */}
        <div
          className={
            sender !== loggedin
              ? 'recevier_message_textarea_wrapper'
              : 'sender_message_textarea_wrapper'
          }
        >
          {text !== '' ? (
            <div className="sender_text_box">{text}</div>
          ) : file && file.name && file.src && checkFileExtension(file.name) ? (
            <div className="picture_card">
              <div className="picture_area">
                <img
                  src={`${USERS_BASE_URL}/chat/${file.src}`}
                  className="pic_size"
                  alt="profile-pic"
                />
              </div>
            </div>
          ) : (
            <div className="sender_text_box">
              <a href={`${USERS_BASE_URL}/chat/${file.src}`} target="__blank">
                <label style={{ color: 'rgb(105, 134, 232)' }}>{file.name}</label>
              </a>
            </div>
          )}{' '}
          {/* {sender === localStorage.getItem('userloggedin') ? (
            <div>
              {seen === 2 ? (
                <BiCheckDouble color="green" size={22} />
              ) : seen === 1 ? (
                <BiCheckDouble color="grey" size={22} />
              ) : (
                <IoIosCheckmark color="grey" size={22} />
              )}
            </div>
          ) : (
            ''
          )} */}
        </div>
        {/* <div>{time}</div> */}
      </div>
    </>
  );
};

export default TextMessage;

{
  /* <div
        className={
          sender !== loggedin
            ? 'd-flex w-100 justify-content-left align-items-center mt-2 min-height-2rem'
            : 'd-flex w-100 justify-content-right align-items-center mt-2 min-height-2rem'
        }
      >
        <div className="p-4 border-radius-1 max-width-80" style={{ backgroundColor: 'grey' }}>
          <div className="pr-8">{text}</div>
        </div>
      </div> */
}
