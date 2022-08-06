// // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
// import { initializeApp } from 'firebase/app';
// const { getMessaging } = require('firebase/messaging');
// import { onBackgroundMessage } from 'firebase/messaging/sw';
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyBfhN5NjwLIgVpgyiiy_4daLR12Zy8BqGE',
  authDomain: 'nest360-c325f.firebaseapp.com',
  projectId: 'nest360-c325f',
  storageBucket: 'nest360-c325f.appspot.com',
  messagingSenderId: '792240065012',
  appId: '1:792240065012:web:ca7d01e4085f02cce291a1',
  measurementId: 'G-TCC9B6ZG4N',
};

// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
