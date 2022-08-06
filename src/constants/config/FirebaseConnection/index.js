import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getToken, onMessage } from 'firebase/messaging';
// import { getMessaging } from 'firebase/messaging';
import { ref, uploadString, getDownloadURL, getStorage } from 'firebase/storage';
// import getFCMToken from './FcmToken';
// import onMessageListener from './MessageListener';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiUkKd1lZCrvDfBlvhxKgmB-mZn7XBOMY",
  authDomain: "nest360.firebaseapp.com",
  projectId: "nest360",
  storageBucket: "nest360.appspot.com",
  messagingSenderId: "129886794606",
  appId: "1:129886794606:web:5a350aa8d151686056877f",
  measurementId: "G-8588GPNVPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const Storage = getStorage();

export {
  db,
  Storage,
  //  getFCMToken, onMessageListener
};
