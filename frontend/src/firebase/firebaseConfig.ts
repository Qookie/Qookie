// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBbV_QLBEaOANp8Mr7rghh_tIVEYHa4Tas',
  // authDomain: 'a504-qookie.firebaseapp.com',
  // authDomain: 'k9a504a.p.ssafy.io',
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: 'a504-qookie',
  storageBucket: 'a504-qookie.appspot.com',
  messagingSenderId: '786533856529',
  appId: '1:786533856529:web:22ffae0e9c7ac8fc4908b0',
  measurementId: 'G-0ZKEJQST24',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);
export { app, auth, messaging };
