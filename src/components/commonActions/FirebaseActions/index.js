import { db, Storage } from '../../../constants/config/FirebaseConnection';
import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  setDoc,
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  limit,
  updateDoc,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import { ORIGIN } from 'constants/config';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
let user = localStorage.getItem('userloggedin');
// export const UpdateWithBlueTick = async id => {};
export const getChats = async (id, setMychats) => {
  if (id == null) return;
  const sendercollectionbyorder = query(
    collection(db, localStorage.getItem('currentChatConnection')),
    orderBy('createdAt')
  );
  await onSnapshot(sendercollectionbyorder, querySnapshot => {
    if (id === localStorage.getItem('currentChatConnection')) {
      const items = [];
      querySnapshot.forEach(async element => {
        // updateDoc
        let newobj = {
          sender: element.data().sender,
          text: element.data().text ? element.data().text : '',
          file: element.data().file ? element.data().file : '',
          id: element.id,
          seen: element.data().seen,
          name: element.data().name,
          createdAt: element.data().createdAt.toDate().toLocaleDateString(),
        };
        items.push(newobj);
      });
      setMychats(items);
    }
  });
};
// export const getChatWithId = () => {};
export const BlueTick = async (connectionId, receiver) => {
  // setting messages have been seen
  const user = localStorage.getItem('userloggedin');
  const singledocref1 = query(collection(db, connectionId), where('sender', '==', receiver)); // message send by receiver
  const docSnap = await getDocs(singledocref1);
  const Ids = [];
  await docSnap.forEach(element => {
    if (element.data()) {
      Ids.push(element.id);
    }
  });
  Ids.map(
    async (id, index) =>
      await updateDoc(doc(db, connectionId, id), {
        seen: 2,
      })
  );
};
export const filterMessages = async messages => {
  const checkFileExtension = name => {
    var allowedExtensions = /(\.apng|\.avif|\.webp|\.pjp|\.pjpeg|\.gif|\.svg|\.png|\.jpeg|\.jpg)$/i;
    if (allowedExtensions.exec(name)) {
      return true;
    }
  };

  const picArray = messages.filter(
    message => message.file !== '' && checkFileExtension(message.file.name)
  );
  const fileArray = messages.filter(
    message => message.file !== '' && !checkFileExtension(message.file.name)
  );

  return {
    picArray,
    fileArray,
  };
};
export const createChatRoom = async (messagesender, messagereceiver) => {
  // creating chat room for sender and receiver
  const chatRoomcollection = collection(db, 'ChatRoom');
  // const NotificationCollection = collection(db, 'NotificationCollection');
  const data = await addDoc(chatRoomcollection, {
    receiver: messagereceiver,
    sender: messagesender,
  }).then(async response => {
    // await setDoc(doc(db, 'Notification', messagereceiver), {});
    // await addDoc(NotificationCollection, {});
    return response.id;
  });
  return data;
};
export const sendMessage = async (collection, idRef, message, user, scene, receiver, name) => {
  console.log(user,receiver)
  const data = await addDoc(collection, {
    chat_id: idRef,
    text: message,
    sender: user,
    seen: scene,
    name: name,
    createdAt: firebase.firestore.Timestamp.now().toDate(),
  }).then(async response => {
    if (scene !== 2) {
      await setDoc(doc(db, `Notification/${receiver}/UnSeenMessages`, response.id), {
        // for nested collections
        // receiver: receiver,
        sender: user,
        message: message,
        createdAt: firebase.firestore.Timestamp.now().toDate(),
      });
    }
    return response.id;
  });
};
export const addUnSeenMessage = async (user_id, group_id, message, user) => {
  await addDoc(collection(db, `Notification/${user_id}/UnSeenMessages`), {
    sender: user,
    message: message,
    sender_id: localStorage.getItem('loggedInUserId'),
    createdAt: firebase.firestore.Timestamp.now().toDate(),
    group_Id: group_id,
  });
};
export const sendGroupMessage = async (collection, info, user, name) => {
  // alert(name);
  // sending message in group
  const data = await addDoc(collection, {
    text: info,
    sender: user,
    name: name,
    createdAt: firebase.firestore.Timestamp.now().toDate(),
  }).then(async response => {
    // if (scene !== 2) {
    //   await setDoc(doc(db, `Notification/${receiver}/UnSeenMessages`, response.id), {
    //     // for nested collections
    //     // receiver: receiver,
    //     sender: user,
    //     message: info,
    //   });
    // }
  });
  // await setDoc(doc(collection), {
  //   text: info,
  //   sender: user,
  //   createdAt: firebase.firestore.Timestamp.now().toDate(),
  // });
};
export const createFileDocument = async (collection, idRef, user, file, seen, receiver, name) => {
  // creating file doc for chat in firebase
  const fileData = { src: file.fileName, type: file.type, name: file.originalName };
  const data = await addDoc(collection, {
    chat_id: idRef,
    sender: user,
    file: fileData,
    seen: seen,
    name: name,
    createdAt: firebase.firestore.Timestamp.now().toDate(),
  }).then(async response => {
    if (seen !== 2) {
      await setDoc(doc(db, `Notification/${receiver}/UnSeenMessages`, response.id), {
        // for nested collections
        // receiver: receiver,
        sender: user,
        message: fileData,
        createdAt: firebase.firestore.Timestamp.now().toDate(),
      });
    }
    return response.id;
  });
};
export const createGroupFileDocument = async (collection, user, file, name) => {
  // storing file for group
  const fileData = { src: file.fileName, type: file.type, name: file.originalName };
  const data = await addDoc(collection, {
    // chat_id: idRef,
    sender: user,
    file: fileData,
    name: name,
    createdAt: firebase.firestore.Timestamp.now().toDate(),
  }).then(response => {
    return response;
  });
  return data;
};

export const checkConnection = async receiverEmail => {
  // checking connection of user and receiver
  let user = localStorage.getItem('userloggedin');
  const singledocref = query(
    collection(db, 'ChatRoom'),
    where('sender', '==', user),
    where('receiver', '==', receiverEmail)
  );
  const singledocref1 = query(
    collection(db, 'ChatRoom'),
    where('sender', '==', receiverEmail),
    where('receiver', '==', user)
  );
  const docSnap = await getDocs(singledocref);
  const docSnap1 = await getDocs(singledocref1);
  return { docSnap, docSnap1 };
};
export const createGroup = async (groupname, groupmembers, groupstaff, user) => {
  // creating group in firebase
  const groupcollection = collection(db, 'Groups');
  await setDoc(doc(groupcollection), {
    groupname: groupname,
    members: groupmembers,
    staff: groupstaff,
    admin: user,
  });
};
export const firebaseFileUploading = async (file, idRef, id) => {
  // uploading file in firebase
  // idRef is name of document in firebase
  const storageRef = ref(Storage, `posts/${id}`);
  uploadBytes(storageRef, file, 'data_url').then(async () => {
    const downloadURL = await getDownloadURL(storageRef);
    const fileData = { src: downloadURL, type: file.type, name: file.name };
    await updateDoc(doc(db, idRef, id), {
      file: fileData,
    });
  });
};
export const createUser = async user => {
  // creating User in firebase
  const data = await findUser(user);
  if (data) {
    // localStorage.setItem('currentUserFirebaseId', data);
    await updateDoc(doc(db, 'Users', data), {
      onlineStatus: true,
      currentUserChat: '',
      // lastSeen: firebase.firestore.Timestamp.now().toDate(),
    });
  } else {
    const chatRoomcollection = collection(db, 'Users');
    await setDoc(doc(db, 'Users', 'admin@gmail.com'), {
      user: user,
      onlineStatus: true,
      currentUserChat: '',
      lastSeen: firebase.firestore.Timestamp.now().toDate(),
    }).then(response => {
      // localStorage.setItem('currentUserFirebaseId', response?.id);
    });
    // await addDoc(chatRoomcollection, {
    // user: user,
    // onlineStatus: true,
    // currentUserChat: '',
    // lastSeen: firebase.firestore.Timestamp.now().toDate(),
    // }).then(response => {
    //   localStorage.setItem('currentUserFirebaseId', response.id);
    // });
  }
};
export const findUser = async user => {
  // finding User from Users collection
  var userData = '';
  const userDb = query(collection(db, 'Users'), where('user', '==', user));
  const docSnap = await getDocs(userDb);
  await docSnap.forEach(element => {
    userData = element.id;
    // console.log(element.id);
  });
  return userData;
};
export const findEndUser = async (user, setEndUser) => {
  // whose chat opened by user
  const userDb = query(collection(db, 'Users'), where('user', '==', user));
  await onSnapshot(userDb, querySnapshot => {
    if (querySnapshot) {
      querySnapshot.forEach(async element => {
        setEndUser(element.data().currentUserChat);
      });
    }
  });
};
export const getGroupOnlineUsers = async (groupid, setGroupOnlineUsers) => {
  console.log('groupid', groupid);
  const userDb = query(collection(db, 'Users'), where('currentUserChat', '==', groupid));
  await onSnapshot(userDb, querySnapshot => {
    const newObj = {};
    var array = [];
    if (querySnapshot) {
      querySnapshot.forEach(async element => {
        array.push(element.id);
      });
      setGroupOnlineUsers(array);
      // console.log('array.......', array);
      // console.log('querySnapshot.size', querySnapshot.size);
    }
  });
};
export const inActiveStatus = async () => {
  // User Offline
  // alert(JSON.parse(localStorage.getItem(`${ORIGIN}_user`)).user._id);
  await updateDoc(doc(db, 'Users', JSON.parse(localStorage.getItem(`${ORIGIN}_user`))?.user?._id), {
    onlineStatus: false,
    currentUserChat: '',
    lastSeen: firebase.firestore.Timestamp.now().toDate(),
  });
  localStorage.removeItem(`${ORIGIN}_user`);
  localStorage.removeItem('messageReceiver');
  localStorage.removeItem('userloggedin');
  localStorage.removeItem('currentChatConnection');
};
export const getOnlineUsers = async setUsersLogin => {
  // getting online Users
  const onlineUsers = query(collection(db, 'Users'), where('onlineStatus', '==', true));
  await onSnapshot(onlineUsers, querySnapshot => {
    const users = [];
    const userId = [];
    querySnapshot.forEach(async element => {
      users.push(element.data().user);
      userId.push(element.data().id);
    });
    setUsersLogin(users);
    return users;
  });
};
export const getOnlineUsersUsingRedux = async () => {
  // getting online Users
  const onlineUsers = query(collection(db, 'Users'), where('onlineStatus', '==', true));
  const users = [];
  return new Promise((resolve, reject) => {
    onSnapshot(onlineUsers, querySnapshot => {
      const userId = [];
      querySnapshot.forEach(async element => {
        users.push(element.data().user);
        userId.push(element.data().id);
      });
      // return users;
      resolve(users);
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
};
export const setCurrentUserChat = async (id, chatUser) => {
  await updateDoc(doc(db, 'Users', 'admin@gmail.com'), {
    currentUserChat: chatUser,
  });
};
export const getUnseenMessageCount = async (receiver, setUnSeenCount) => {
  const messageR = JSON.parse(localStorage.getItem(`${ORIGIN}_user`))?.user?.email;
  const UnSeen = query(collection(db, `Notification/${messageR}/UnSeenMessages`)); // query for getting unseen messages
  await onSnapshot(UnSeen, querySnapshot => {
    setUnSeenCount(querySnapshot.size);
  });
};
export const getAllGroupUnseenCount = async setGroupUnSeen => {
  const user_id = localStorage.getItem('loggedInUserId');
  const groupsUnseen = query(collection(db, `Notification/${user_id}/UnSeenMessages`));
  await onSnapshot(groupsUnseen, querySnapshot => {
    setGroupUnSeen(querySnapshot.size);
  });
};
export const DeleteSeenMessage = async send => {
  // const messageR = JSON.parse(localStorage.getItem(`${ORIGIN}_user`))?.user?.email;
  const messageR = 'admin@gmail.com';
  const unSeenRemove = query(
    // query for getting  UnSeenMessage
    collection(db, `Notification/${messageR}/UnSeenMessages`), //from login user
    where('sender', '==', send) // who sent messages
  );

  const docSnap = await getDocs(unSeenRemove);
  // alert(docSnap.size);
  await docSnap.forEach(async element => {
    if (element.data()) {
      await deleteDoc(doc(db, `Notification/${messageR}/UnSeenMessages`, element.id)); // deleting unseen messages if user have seen messages
    }
  });
};
export const DeleteGroupSeenMessage = async group_id => {
  const user_id = localStorage.getItem('loggedInUserId');
  const unSeenRemove = query(
    // query for getting  UnSeenMessage
    collection(db, `Notification/${user_id}/UnSeenMessages`), //from login user
    where('group_Id', '==', group_id) // who sent messages
  );
  const docSnap = await getDocs(unSeenRemove);
  // alert(docSnap.size);
  await docSnap.forEach(async element => {
    if (element.data()) {
      await deleteDoc(doc(db, `Notification/${user_id}/UnSeenMessages`, element.id)); // deleting unseen messages if user have seen messages
    }
  });
};
export const singleChatUnseen = async (receiver, sender, setUnseenMessages) => {
  // const messageR = JSON.parse(localStorage.getItem(`${ORIGIN}_user`))?.user?.email;
  const messageR = 'admin@gmail.com';
  console.log('sender in SigleChat Unseen', sender);
  const UnSeen = query(
    collection(db, `Notification/${messageR}/UnSeenMessages`),
    where('sender', '==', sender)
  ); // query for getting unseen messages
  await onSnapshot(UnSeen, querySnapshot => {
    setUnseenMessages(querySnapshot.size);
  });
};
export const getSingleGroupUnseen = async (group_id, setUnSeenCount) => {
  const user_id = localStorage.getItem('loggedInUserId');
  const MessageReceiver = query(
    collection(db, `Notification/${user_id}/UnSeenMessages`),
    where('group_Id', '==', group_id)
  );
  await onSnapshot(MessageReceiver, querySnapshot => {
    setUnSeenCount(querySnapshot.size);

    // console.log(
    //   localStorage.getItem('loggedInUserId'),
    //   'querySnapshot.size',
    //   querySnapshot.size,
    //   'group_id',
    //   group_id
    // );
  });
};
export const getUnSeenLastMessage = async (currentEmail, setMessage) => {
  // alert('SomeOne calling me');
  const UnSeen = query(
    collection(db, `Notification/${localStorage.getItem('userloggedin')}/UnSeenMessages`),
    orderBy('createdAt')
  );
  await onSnapshot(UnSeen, querySnapshot => {
    if (
      querySnapshot.size > 0 &&
      querySnapshot.docs[querySnapshot.size - 1].data() !== currentEmail
    ) {
      setMessage(querySnapshot.docs[querySnapshot.size - 1].data());
    }
  });
};

const getUsersConnection = async () => {
  dispatch(
    // checking connection from mongodb
    AdminChatActions.checkUserConnection.request([
      localStorage.getItem('userloggedin'),
      receiverinfo.email,
    ])
  );
};

// export const getSenderReceiver = async callback => {
//   IDRef.current = null;
//   // dispatch(
//   //   // checking connection from mongodb
//   //   AdminChatActions.checkUserConnection.request([
//   //     localStorage.getItem('userloggedin'),
//   //     receiverinfo.email,
//   //   ])
//   // );
//   const { docSnap, docSnap1 } = await checkConnection(receiverinfo.email); // checking if conections sxist in firebase
//   docSnap.forEach(element => {
//     if (element.data() && element.data().sender && element.data().receiver) {
//       IDRef.current = element.id;
//     }
//   });
//   docSnap1.forEach(element => {
//     if (element.data() && element.data().sender && element.data().receiver) {
//       IDRef.current = element.id;
//     }
//   });
//   if (IDRef.current === null || IDRef.current === '') {
//     // dispatch(AdminChatActions.createOnetoOneConnection.request([user, receiverinfo.email])); // creating chatRoom Connection of User for chatting in mongo
//     const data = await createChatRoom(user, receiverinfo.email); // creating sender and receiver connection
//     IDRef.current = data; // data is id of both users connection.
//     localStorage.setItem('currentChatConnection', data);
//     callback(data, setMychats);
//     await BlueTick(IDRef.current, receiverinfo.email); // to set message have been seen by receiver
//   } else {
//     localStorage.setItem('currentChatConnection', IDRef.current);
//     callback(IDRef.current, setMychats);
//     await BlueTick(IDRef.current, receiverinfo.email); // to set message have been seen by receiver
//   }
// };

// const submitMessage = async e => {
//   e.preventDefault();
//   if (receiverinfo.type !== 'group') {
//     const messageCollection = collection(db, IDRef.current); // ref of collection
//     if (IDRef.current !== '' || IDRef.current !== null) {
//       if (usersLogin.includes(receiverinfo.email) && endUser === user) {
//         // if receiver end  user is the user logged in then it will set blue tick to current message
//         await sendMessage(
//           messageCollection,
//           IDRef.current,
//           message.text,
//           user,
//           0,
//           receiverinfo.email
//         ); // blue double tick
//       }
//       // else if (usersLogin.includes(receiverinfo.email) && endUser !== user) {
//       //   await sendMessage(messageCollection, IDRef.current, message.text, user, 1);
//       // }//doule grey tick
//       else {
//         await sendMessage(
//           messageCollection,
//           IDRef.current,
//           message.text,
//           user,
//           0,
//           receiverinfo.email
//         ); // single grey tick
//       }
//       // await sendMessage(messageCollection, IDRef.current, message.text, user);
//     }
//   } else if (receiverinfo.type === 'group') {
//     const messageCollection = collection(db, receiverinfo.email);
//     await sendGroupMessage(messageCollection, message.text, user); // sending message in group
//   }
//   setMessage({ ...message, text: '' });
// };

// useEffect(() => {
//   localStorage.setItem(
//     'userloggedin',
//     JSON.parse(localStorage.getItem(`${ORIGIN}_user`)).user.email
//   );
//   getChats(receiveeer);
// }, []);

// await setDoc(doc());
// setMessage({ ...message, [e.target.name]: e.target.value });
// await setDoc(doc(sendercollection), {
//   ...message,
//   receiver: receiveeer,
//   createdAt: firebase.firestore.Timestamp.now().toDate(),
// });
// if (receiveeer !== localStorage.getItem('userloggedin'))
//   await setDoc(doc(receivercollection), {
//     ...message,
//     receiver: receiveeer,
//     createdAt: firebase.firestore.Timestamp.now().toDate(),
//   });

// itemssss.sort(function (x, y) {
//   return x.createdAt - y.createdAt;
// });
// const updatedChats = itemssss.filter(
//   item =>
//     item.receiver === receiveeer || (item.receiver === user && item.sender === receiveeer)
// );
// console.log(updatedChats);
// setMychats(updatedChats);

// time={chat.createdAt.toDate().toDateString()}
// time={chat.createdAt.seconds}
// time={chat.createdAt.seconds}
// time={chat.createdAt.toDate().toTimeString()}

// console.log(newobj.createdAt.seconds);
// console.log(new Date(newobj.createdAt.seconds).getTime());

// const getChats = async id => {
//   if (id == null) return;
//   const sendercollectionbyorder = query(collection(db, id), orderBy('createdAt'));
//   await onSnapshot(sendercollectionbyorder, querySnapshot => {
//     const itemssss = [];
//     querySnapshot.forEach(async element => {
//       let newobj = {
//         sender: element.data().sender,
//         text: element.data().text,
//         id: element.id,
//         createdAt: element.data().createdAt,
//       };
//       itemssss.push(newobj);
//     });
//     setMychats(itemssss);
//   });
// };

// const createChatRoom = async (messagesender, messagereceiver) => {
//   const chatRoomcollection = collection(db, 'ChatRoom');
//   await setDoc(doc(chatRoomcollection), {
//     receiver: messagereceiver,
//     sender: messagesender,
//   });
// };

// await setDoc(doc(messageCollection), {
//   // chat_id: IDRef.current,
//   text: message.text,
//   sender: user,
//   createdAt: firebase.firestore.Timestamp.now().toDate(),
// });

// await setDoc(doc(messageCollection), {
//   chat_id: IDRef.current,
//   text: message.text,
//   sender: user,
//   createdAt: firebase.firestore.Timestamp.now().toDate(),
// });

// const docSnap = await getDocs(singledocref);
// const docSnap1 = await getDocs(singledocref1);

// const storageRef = ref(Storage, `posts/${data.id}`);
// uploadBytes(storageRef, file, 'data_url').then(async () => {
//   const downloadURL = await getDownloadURL(storageRef);
//   console.log(downloadURL);
//   await updateDoc(doc(db, IDRef.current, data?.id), {
//     file: downloadURL,
//   });
// });
// console.log('id>>>>>>>>>>> ', data.id);

// onClick="showRecordingWrapper()"

// await sendGroupMessage(fileCollection, message.text, user);

// for (var item of formdata.entries()) {
//   // used to console file data
// }
// chat get and connection check
// useEffect(() => { //firebase
//   console.log('currentChatConnection...', receiverinfo.email);
//   localStorage.setItem('currentChatConnection', receiverinfo.email);
//   receiverinfo.type !== 'group'
//     ? getSenderReceiver(getChats) // getting sender and receiver if not found then it will create
//     : receiverinfo.type === 'group'
//     ? getChats(receiverinfo.email, setMychats) // here receiverinfo.email is id of group
//     : '';
//   setMychats([]);
// }, [receiverinfo.email]);

// useEffect(() => {
//   // console.log('Using Mongo');
//   // localStorage.setItem('currentChatConnection', receiverinfo.email);
//   receiverinfo.type !== 'group'
//     ? getUsersConnection()
//     : receiverinfo.type === 'group'
//     ? getChats(receiverinfo.email, setMychats) // here receiverinfo.email is id of group
//     : '';
// }, [receiverinfo.email]);

// const getSenderReceiver = async callback => {
//   idRef.current = null;
//   const { docSnap, docSnap1 } = await checkConnection(emailRef.current);
//   docSnap.forEach(element => {
//     if (element.data() && element.data().sender && element.data().receiver) {
//       idRef.current = element.id;
//     }
//   });
//   docSnap1.forEach(element => {
//     if (element.data() && element.data().sender && element.data().receiver) {
//       idRef.current = element.id;
//     }
//   });
//   if (idRef.current === null && emailRef.current !== '') {
//     const data = await createChatRoom(user, emailRef.current);
//     idRef.current = data;
//     localStorage.setItem('currentChatConnection', data);
//     await callback(data, setMychats);
//     await BlueTick(idRef.current, emailRef.current);
//   } else {
//     localStorage.setItem('currentChatConnection', idRef.current);
//     await callback(idRef.current, setMychats);
//     await BlueTick(idRef.current, emailRef.current);
//     // console.log('output', mychats);
//   }
// };

// <div
//   key={index}
//   className={borderColor == index ? 'image' : 'img_outer_circle_wrapper'}
//   onClick={() => {
//     // alert(customerAdmin?.staff?.email);
//     emailRef.current = customerAdmin?.staff?.email;
//     // setReceiver(customerAdmin?.staff?.email);
//     getConnection(customerAdmin?.staff?.email);
//     handleBorderChange(index);
//   }}
// >
//   <Tooltip
//     placement="bottom"
//     title={
//       usersLogin.includes(customerAdmin?.staff?.email) ? 'Online' : 'Offline'
//     }
//   >
//     <div className="singlechat_outer_boxx">
//       <img src="pic.png" alt="user-img" />
//       <div
//         className={
//           usersLogin.includes(customerAdmin?.staff?.email)
//             ? 'active_cir'
//             : 'inActive_cir'
//         }
//       ></div>
//     </div>
//   </Tooltip>
//   {/* {usersLogin.includes(customerAdmin.staff.email) ? 'ON' : 'OFF'} */}
// </div>

// useEffect(() => {
//   localStorage.setItem(
//     'userloggedin',
//     JSON.parse(localStorage.getItem(`${ORIGIN}_user`)).user.email
//   );
//   receiverinfo.type === 'chat'
//     ? getSenderReceiver(getChats)
//     : receiverinfo.type === 'group'
//     ? getChats(receiverinfo.email)
//     : '';
//   setMychats([]);
// }, [receiverinfo.email]);

// const getChats = async id => {
//   if (id == null) return;
//   const sendercollectionbyorder = query(collection(db, id), orderBy('createdAt'));
//   await onSnapshot(sendercollectionbyorder, querySnapshot => {
//     const items = [];
//     querySnapshot.forEach(async element => {
//       let newobj = {
//         sender: element.data().sender,
//         text: element.data().text,
//         id: element.id,
//         createdAt: element.data().createdAt,
//       };
//       items.push(newobj);
//     });
//     console.log('items..........: ', items);
//     setMychats(items);
//   });
// };

{
  /* <div className={senderAdmin ? 'client_message_txt_wrapper' : 'admin_message_txt_wrapper'}>
            <h4 className={senderAdmin ? 'h4_title_client' : 'h4_title_admin'}>Usman</h4>
            <p>Lorem ipsum,</p>
          </div> */
}
