import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  limit,
  updateDoc,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import db from '../Firebaseconnection';
export const getChats = async (id, setMychats) => {
  if (id == null) return;
  const sendercollectionbyorder = query(collection(db, id), orderBy('createdAt'));
  await onSnapshot(sendercollectionbyorder, querySnapshot => {
    const itemssss = [];
    querySnapshot.forEach(async element => {
      let newobj = {
        sender: element.data().sender,
        text: element.data().text,
        id: element.id,
        createdAt: element.data().createdAt,
      };
      itemssss.push(newobj);
    });
    setMychats(itemssss);
  });
};
// export const getSenderReceiver = async (callback, IDRef, receiverinfo, setChatId, setMychats) => {
//   IDRef = null;
//   let user = localStorage.getItem('userloggedin');
//   const singledocref = query(
//     collection(db, 'ChatRoom'),
//     where('sender', '==', user),
//     where('receiver', '==', receiverinfo)
//   );
//   const singledocref1 = query(
//     collection(db, 'ChatRoom'),
//     where('sender', '==', receiverinfo),
//     where('receiver', '==', user)
//   );
//   const docSnap = await getDocs(singledocref);
//   const docSnap1 = await getDocs(singledocref1);
//   docSnap.forEach(element => {
//     if (element.data() && element.data().sender && element.data().receiver) {
//       IDRef = element.id;
//       setChatId(element.id);
//     }
//   });
//   docSnap1.forEach(element => {
//     if (element.data() && element.data().sender && element.data().receiver) {
//       IDRef = element.id;
//       setChatId(element.id);
//     }
//   });
//   callback(IDRef, setMychats);
// };
