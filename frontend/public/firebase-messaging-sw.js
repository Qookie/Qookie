// this file is for firebase messaging service-worker at background
// use firebase version 9.-compat.js to use importScripts
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBbV_QLBEaOANp8Mr7rghh_tIVEYHa4Tas',
  // authDomain: 'a504-qookie.firebaseapp.com',
  authDomain: 'k9a504.p.ssafy.io',
  projectId: 'a504-qookie',
  storageBucket: 'a504-qookie.appspot.com',
  messagingSenderId: '786533856529',
  appId: '1:786533856529:web:22ffae0e9c7ac8fc4908b0',
  measurementId: 'G-0ZKEJQST24',
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('BG PAYLOAD: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/192.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener('install', function (e) {
//   console.log('fcm sw install');
//   self.skipWaiting();
// });

// self.addEventListener('activate', function (e) {
//   console.log('fcm activate');
// });

// self.addEventListener('push', function (e) {
//   if (!e.data.json()) return;

//   console.log(e);
//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//     icon: resultData.icon,
//     tgag: resultData.tag,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclick", function (event) {
//   console.log("notification click");
//   const url = "/";
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
