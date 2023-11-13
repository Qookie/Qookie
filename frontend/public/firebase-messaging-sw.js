// this file is for firebase messaging service-worker at background
// use firebase version 9.-compat.js to use importScripts
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBbV_QLBEaOANp8Mr7rghh_tIVEYHa4Tas',
  // authDomain: 'a504-qookie.firebaseapp.com',
  authDomain: 'k9a504a.p.ssafy.io',
  projectId: 'a504-qookie',
  storageBucket: 'a504-qookie.appspot.com',
  messagingSenderId: '786533856529',
  appId: '1:786533856529:web:22ffae0e9c7ac8fc4908b0',
  measurementId: 'G-0ZKEJQST24',
});

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: '/logo192.png',
    };
    var show = self.registration.showNotification(notificationTitle, notificationOptions);
    event.waitUntil(show);
  });
});

// self.addEventListener('notificationclick', function (event) {
//   const url = '/mypage';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
