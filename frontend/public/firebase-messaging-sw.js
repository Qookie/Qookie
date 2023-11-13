// this file is for firebase messaging service-worker at background
// use firebase version 9.-compat.js to use importScripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBbV_QLBEaOANp8Mr7rghh_tIVEYHa4Tas',
  authDomain: 'a504-qookie.firebaseapp.com',
  projectId: 'a504-qookie',
  storageBucket: 'a504-qookie.appspot.com',
  messagingSenderId: '786533856529',
  appId: '1:786533856529:web:22ffae0e9c7ac8fc4908b0',
  measurementId: 'G-0ZKEJQST24',
});

// const messaging = firebase.messaging();
// messaging.onBackgroundMessage((payload) => {
//   console.log('BG PAYLOAD: ', payload);

//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: '/logo192.png',
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

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

// self.addEventListener('notificationclick', function (event) {
//   console.log('notification click');
//   const url = '/mypage';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

// Listen for push events and ensure no default notification is shown
self.addEventListener('push', (event) => {
  event.waitUntil(
    (async () => {
      console.log('A', event);
      // Your custom push handling here
      // ...

      // If you don't want to show any notification for certain pushes,
      // just resolve immediately
      return self.registration.getNotifications().then((notifications) => {
        console.log('B');
        if (notifications && notifications.length > 0) {
          console.log('C');
          // You have active notifications, possibly handle them in some way
        }
        console.log('D');
        // Resolve the promise to let the browser know you have displayed a notification
        return;
      });
    })(),
  );
});
