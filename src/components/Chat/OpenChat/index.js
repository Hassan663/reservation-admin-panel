import React, { useEffect, useState, useRef } from 'react';
import '../../../theme/base.scss';
import './opnechat.scss';
import TextMessage from '../TextMessage';
import {
  db,
  //  getFCMToken
} from '../../../constants/config/FirebaseConnection';
import { collection } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import 'moment-timezone';
import OpenChatStaffHeader from '../OpenChhatStaffHeader';
import OpenChatGroupHeader from '../OpenChatGroupHeader';
import OpenChatClientHeader from '../OpenChatClientHeader';
import { AiFillFileImage } from 'react-icons/ai';
import { Tooltip } from 'antd';
// import fileApi from '../../../services/fileUploading';
import { ORIGIN } from 'constants/config';
import {
  getChats,
  createChatRoom,
  sendMessage,
  checkConnection,
  createGroupFileDocument,
  createFileDocument,
  findEndUser,
  setCurrentUserChat,
  getOnlineUsers,
  BlueTick,
  getUnseenMessageCount,
  DeleteSeenMessage,
  getGroupOnlineUsers,
  addUnSeenMessage,
} from '../../commonActions/FirebaseActions/index';
import { Drawer, Space, Button } from 'antd';
import AdminChatActions from 'modules/adminChat/actions';
import StaffDrawer from '../StaffDrawer';
import adminChat from 'services/adminChat';
const OpenChat = ({ receiverinfo, openStaffModel, setOpenStaffModel, setShowChatModel }) => {
  const dispatch = useDispatch();
  const [usersLogin, setUsersLogin] = useState([]);
  const formdata = new FormData();
  localStorage.setItem('loggedInUserId', 'admin@gmail.com');
  const [message, setMessage] = useState({
    sender: localStorage.getItem('userloggedin'),
    receiver: '',
    text: '',
    fileRef: '',
  });

  const [mychats, setMychats] = useState([]);
  const [endUser, setEndUser] = useState('');
  const [groupOfflineUsers, setGroupOfflineUsers] = useState([]);
  const IDRef = useRef(null);
  const { loading, userConnectionId, groups, currentGroupUsersIds, endUserid, multiEndUsersToken } =
    useSelector(state => state.adimnChatReducer);
  const adminAuth = useSelector(state => state.authReducer);
  const firstName = adminAuth.user?.user?.firstName ?? adminAuth.user?.firstName;
  const lastName = adminAuth.user?.user?.lastName ?? adminAuth.user?.lastName;

  useEffect(() => {
    getOnlineUsers(setUsersLogin); // getting curret online users
    return async () => {
      await setCurrentUserChat('', ''); // current user end user.. mean jis ki chat ham na open ki thi
    };
  }, []);

  useEffect(async () => {
    // mongodb
    if (userConnectionId !== '') {
      localStorage.setItem('currentChatConnection', userConnectionId); // setting conection id
      IDRef.current = userConnectionId; //connection id ref
      getChats(userConnectionId, setMychats); // getting chat of current conection
      // await BlueTick(IDRef.current, receiverinfo.email); // setting blue tick if message seen by user
    }
  }, [userConnectionId]);

  useEffect(() => {
    if (receiverinfo.type !== 'group') {
      // DeleteSeenMessage(receiverinfo.email); // deleting
      // setEndUser(''); // setting null to end user
      // alert('gettiing end user');
      // findEndUser(receiverinfo.email, setEndUser); // checking whose chat is opened by receiver
    }
  }, [receiverinfo.email]); // when will click on someone chat

  const onStaffModelClose = () => {
    setOpenStaffModel(false);
  };
  let user = localStorage.getItem('userloggedin');
  const currentMessage = useRef(null);
  const submitMessage = async e => {
    if (message.text) {
      currentMessage.current = message.text;
      setMessage({ ...message, text: '' });
      e.preventDefault();
      if (receiverinfo.type !== 'group') {
        const messageCollection = collection(db, IDRef.current); // ref of collection
        if (IDRef.current !== '' || IDRef.current !== null) {
          console.log(usersLogin, 'usersLogin', endUser, 'endUser', user, 'endUser');
          if (usersLogin.includes(receiverinfo.email) && endUser === user) {
            // if receiver end  user is the user logged in then it will set blue tick to current message
            await sendMessage(
              messageCollection,
              IDRef.current,
              currentMessage.current,
              // message.text,
              user,
              2,
              receiverinfo.email,
              firstName + ' ' + lastName
            ); // blue double tick
          }
          // else if (usersLogin.includes(receiverinfo.email) && endUser !== user) {
          //   await sendMessage(messageCollection, IDRef.current, message.text, user, 1);
          // }//doule grey tick
          else {
            await sendMessage(
              messageCollection,
              IDRef.current,
              currentMessage.current,
              // message.text,
              user,
              0,
              receiverinfo.email,
              firstName + ' ' + lastName
            ); // single grey tick
            // if (usersLogin.includes(receiverinfo.email)) {
            //   dispatch(
            //     AdminChatActions.sendNotification.request({
            //       id: [endUserid],
            //       payload: {
            //         title: `New Message From ${firstName} ${lastName}`,
            //         // body: message.text,
            //         body: currentMessage.current,
            //       },
            //     })
            //   );
            // }
          }
          // await sendMessage(messageCollection, IDRef.current, message.text, user);
        }
      } else if (receiverinfo.type === 'group') {
        const messageCollection = collection(db, userConnectionId); // here receiverinfo.email is firebase id of group
        await sendGroupMessage(
          messageCollection,
          currentMessage.current,
          user,
          firstName + ' ' + lastName
        ); // sending message in group
        // dispatch(
        //   AdminChatActions.sendNotification.request({
        //     id: [...currentGroupUsersIds],
        //     payload: {
        //       title: `New Message From ${adminAuth.user.user.firstName} ${adminAuth.user.user.lastName} in Group`,
        //       body: message.text,
        //     },
        //   })
        // );
        for (const obj of groupOfflineUsers) {
          console.log('groupOfflineUsers', groupOfflineUsers);
          await addUnSeenMessage(obj, userConnectionId, currentMessage.current, user);
        }
      }
      currentMessage.current = null;
    }
  };
  const uploadFile = async (file, e) => {
    if (file) {
      formdata.append('file', file);

      if (receiverinfo.type !== 'group') {
        const fileCollection = collection(db, IDRef.current);
        if (IDRef.current !== '' || IDRef.current !== null) {
          const data = await fileApi.uploadFile(formdata);
          console.log('Response of File Uplading......', data);
          if (usersLogin.includes(receiverinfo.email) && endUser === user) {
            await createFileDocument(
              fileCollection,
              IDRef.current,
              user,
              data,
              2,
              receiverinfo.email,
              firstName + ' ' + lastName
            ); // storing file Info in firebase
          }
          //  else if (usersLogin.includes(receiverinfo.email) && endUser !== user) {
          //   await createFileDocument(fileCollection, IDRef.current, user, data, 1);
          // }
          else {
            await createFileDocument(
              fileCollection,
              IDRef.current,
              user,
              data,
              0,
              receiverinfo.email,
              firstName + ' ' + lastName
            ); // storing file Info in firebase
            // if (usersLogin.includes(receiverinfo.email)) {
            //   dispatch(
            //     AdminChatActions.sendNotification.request({
            //       id: [endUserid],
            //       payload: {
            //         title: `New Message From ${firstName} ${lastName}`,
            //         body: data.originalName,
            //       },
            //     })
            //   );
            // }
          }
          // await firebaseFileUploading(file, IDRef.current, documentid);
        }
      }
      // else if (receiverinfo.type === 'group') {
      //   const fileCollection = collection(db, userConnectionId); // group connection ' receiverinfo.email is  group id
      //   const data = await fileApi.uploadFile(formdata); // uploading file in node server
      //   await createGroupFileDocument(fileCollection, user, data, firstName + ' ' + lastName); // group sub document
      //   for (const obj of groupOfflineUsers) {
      //     console.log('groupOfflineUsers', groupOfflineUsers);
      //     await addUnSeenMessage(obj, userConnectionId, data, user);
      //   }
      //   // dispatch(
      //   //   AdminChatActions.sendNotification.request({
      //   //     id: [...currentGroupUsersIds],
      //   //     payload: {
      //   //       title: `New Message From ${adminAuth.user.user.firstName} ${adminAuth.user.user.lastName} in Group`,
      //   //       body: data.originalName,
      //   //     },
      //   //   })
      //   // );
      //   // await firebaseFileUploading(file, receiverinfo.email, documentid); // file uploading in firebase
      // }
      e.target.value = null;
    }
    // }
  };
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

  return (
    <>
      {receiverinfo.type === 'chat' && (
        <div>
          <OpenChatStaffHeader
            receiverinfo={receiverinfo}
            openStaffModel={openStaffModel}
            setOpenStaffModel={setOpenStaffModel}
          />
        </div>
      )}

      {/* {receiverinfo.type !== 'group' && openStaffModel && (
        <Drawer
          title="Drawer with extra actions"
          placement={'right'}
          width={465}
          style={{ marginTop: '132px', marginRight: '20px', height: '76vh' }}
          bodyStyle={{ backgroundColor: 'rgb(232 232 232)' }}
          onClose={onStaffModelClose}
          visible={openStaffModel}
          // bodyStyle={{ width: '100px' }}
        >
          <StaffDrawer mychats={mychats} setOpenStaffModel={setOpenStaffModel} />
        </Drawer>
      )} */}

      <div className="txt_area_main_container_us" ref={containerRef}>
        {!loading &&
          mychats.map((chat, index) => (
            <TextMessage
              name={chat.name}
              text={chat.text}
              time={chat.createdAt}
              file={chat.file}
              key={index}
              seen={chat.seen}
              sender={chat.sender}
              loggedin={localStorage.getItem('userloggedin')}
            />
          ))}
      </div>

      <div className="openchat_footer_text_input_main_container">
        <form onSubmit={submitMessage}>
          <input
            placeholder="Type a Message..."
            value={message.text}
            onChange={e => setMessage({ ...message, text: e.target.value })}
          />
          {/* <div className="open_chat_svgs_main_container">
            <svg className="search_client_messages" viewBox="0 0 24 24">
              <path d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M5,3H19C20.11,3 21,3.89 21,5V13.03C20.5,12.23 19.81,11.54 19,11V5H5V19H9.5C9.81,19.75 10.26,20.42 10.81,21H5C3.89,21 3,20.11 3,19V5C3,3.89 3.89,3 5,3M7,7H17V9H7V7M7,11H12.03C11.23,11.5 10.54,12.19 10,13H7V11M7,15H9.17C9.06,15.5 9,16 9,16.5V17H7V15Z"></path>
            </svg>

            <input
              type="file"
              id="file_uploading"
              onChange={async e => {
                await uploadFile(e.currentTarget.files[0], e);
              }}
              style={{ display: 'none' }}
            />
            <label for="file_uploading">
              <Tooltip placement="top" title="Upload file">
                <AiFillFileImage />
              </Tooltip>
            </label>
          </div> */}
          <button type="submit">
            <svg className="fa-paper-plane" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8,7.71V11.05L15.14,12L8,12.95V16.29L18,12L8,7.71Z"></path>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default OpenChat;
