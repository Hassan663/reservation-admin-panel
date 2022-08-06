import { initializeApp } from 'firebase/app';
import { getToken } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging';
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
const getFCMToken = async setTokenFound => {
  try {
    const vapidKey =
      'BH61bmYyOrgnebTPgQCgkAvEd3-PxaVzVYPMDzUVK-W0GrPQEDlm2nWw3acsyZVqis-s1y0UTCpBQ2w_Kz8z7j4';
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      const token = await getToken(messaging, { vapidKey: vapidKey });
      setTokenFound(token);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(async function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const token = await getToken(messaging, { vapidKey: vapidKey });
          setTokenFound(token);
        }
      });
    }
  } catch (e) {
    console.log('getFCMToken error', e);
  }
};

export default getFCMToken;
