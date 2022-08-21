import { initializeApp } from 'firebase/app';

import { onMessage } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging';
import { Button, notification } from 'antd';
import { NotificationContainer, NotificationManager } from 'react-notifications';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBfhN5NjwLIgVpgyiiy_4daLR12Zy8BqGE',
  authDomain: 'nest360-c325f.firebaseapp.com',
  projectId: 'nest360-c325f',
  storageBucket: 'nest360-c325f.appspot.com',
  messagingSenderId: '792240065012',
  appId: '1:792240065012:web:ca7d01e4085f02cce291a1',
  measurementId: 'G-TCC9B6ZG4N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const onMessageListener = () => {
  return new Promise(resolve => {
    onMessage(messaging, payload => {
      // alert('Message Received')
      // NotificationManager.success(payload.notification.body, payload.notification.title);

      const args = {
        message: ' New Message from ',
        description: payload.notification.body,
        duration: 3,
      };
      notification.open(args);
      resolve(payload);
    });
  });
};
export default onMessageListener;
