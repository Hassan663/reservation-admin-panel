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
  apiKey: 'AIzaSyBEOTprg3CZ9ObssWJcfzDagKiUk7j8CRM',
  authDomain: 'bostom-855fe.firebaseapp.com',
  projectId: 'bostom-855fe',
  storageBucket: 'bostom-855fe.appspot.com',
  messagingSenderId: '100399206149',
  appId: '1:100399206149:web:0a871083dab21782f9f16c',
  measurementId: 'G-6Q4TN1K9T4',
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
