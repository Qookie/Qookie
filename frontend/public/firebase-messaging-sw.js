// this file is for firebase messaging service-worker at background
// use firebase version 9.-compat.js to use importScripts
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBbV_QLBEaOANp8Mr7rghh_tIVEYHa4Tas',
  authDomain: 'a504-qookie.firebaseapp.com',
  projectId: 'a504-qookie',
  storageBucket: 'a504-qookie.appspot.com',
  messagingSenderId: '786533856529',
  appId: '1:786533856529:web:22ffae0e9c7ac8fc4908b0',
  measurementId: 'G-0ZKEJQST24',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('A');

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/logo192.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('push', (event) => {
  console.log('B', event);
  event.waitUntil(self.registration.showNotification('title', {}));
});

// Listen for push events and ensure no default notification is shown
// self.addEventListener('push', (event) => {
//   console.log('AA');
//   event.waitUntil(
//     (async () => {
//       // messaging.onBackgroundMessage((payload) => {
//       //   console.log('BG: ', payload);

//       //   const notificationTitle = payload.data.title;
//       //   const notificationOptions = {
//       //     body: payload.data.body,
//       //     icon: '/logo192.png',
//       //   };
//       //   return self.registration.getNotifications().then((notifications) => {
//       //     console.log('???: ', notifications);
//       //     self.registration.showNotification(notificationTitle, notificationOptions);
//       //     return;
//       //   });
//       // });
//       console.log('A', event);
//       // Your custom push handling here
//       // ...
//       var pl;
//       messaging.onBackgroundMessage((payload) => {
//         pl = payload;
//         console.log('B');
//         console.log('Payload: ', payload);
//       });

//       // If you don't want to show any notification for certain pushes,
//       // just resolve immediately
//       return self.registration.getNotifications().then((notifications) => {
//         console.log('C', pl);
//         const notificationTitle = pl.data.title;
//         const notificationOptions = {
//           body: pl.data.body,
//           icon: '/logo192.png',
//         };
//         self.registration.showNotification(notificationTitle, notificationOptions);
//         // Resolve the promise to let the browser know you have displayed a notification
//         return;
//       });
//     })(),
//   );
// });

// messaging.onBackgroundMessage((payload) => {
//   console.log('BG PAYLOAD: ', payload);

//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: '/logo192.png',
//   };
//   return self.registration.getNotifications().then((notifications) => {
//     console.log('???: ', notifications);
//     self.registration.showNotification(notificationTitle, notificationOptions);
//     return;
//   });
// });

// self.addEventListener('install', function (e) {
//   console.log('fcm sw install');
//   self.skipWaiting();
// });

// self.addEventListener('notificationclick', function (event) {
//   const url = '/mypage';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
