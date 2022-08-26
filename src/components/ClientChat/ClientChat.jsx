import React, { useState, useEffect, useRef, useMemo } from 'react';
import './clientChat.scss';

import { useDispatch, useSelector } from 'react-redux';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const ClientChat = ({ showChat, setShowChat }) => {
  const user = localStorage.getItem('userloggedin');
  const scrollRef = useRef();

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);

  const [mychats, setMychats] = useState(['1 ', '2', '3']);
  const [message, setMessage] = useState({
    sender: localStorage.getItem('userloggedin'),
    receiver: '',
    text: '',
  });

  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [containerRef, mychats]);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: 'smooth' }); // used for scroll chat to end
  }, [mychats]);
  const closeChat = () => {
    setShowChat(false);
  };
  const currentMessage = useRef(null); // used to clear the message from input field

  return (
    <div className="client_chat_main_container">
      <div className="client_chat_header_main_wrapper">
        <div className="chat_header_logo_wrapper">{/* <img src={logoHeader} alt="logo" /> */}</div>
        <div className="chat_close_button_wrapper">
          <div className="client_chat_header_close_wrapper">
            <svg
              fill="#FFFFFF"
              height="15"
              viewBox="0 0 15 15"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setShowChat(!showChat);
              }}
            >
              <line x1="1" y1="15" x2="15" y2="1" stroke="white" stroke-width="3"></line>
              <line x1="1" y1="1" x2="15" y2="15" stroke="white" stroke-width="3"></line>
            </svg>
          </div>
        </div>
      </div>
      {true ? (
        <div id="style-5" ref={containerRef} className={'client_chat_body_main_container'}>
          {mychats.map((chat, index) => (
            <label>ok</label>
          ))}
        </div>
      ) : (
        <div className="start_chat_main_container">loading......</div>
      )}
    </div>
  );
};

export default ClientChat;
