import { messaging } from './firebaseConfig';
import { getToken, onMessage, isSupported } from '@firebase/messaging';
import { showToast } from '../components/shared/molecules/Alert';

const initiateFirebaseMessaging = () => {
  // get permission from user
  void Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem('messageToken', currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('ERROR AT FIREBASE MESSAGING: ', err);
        });

      onMessage(messaging, (payload) => {
        if (payload.data) {
          showToast({
            title: payload.data?.title,
            content: payload.data?.body,
          });
        }
      });
    } else {
      alert('알림이 허용되지 않았습니다. 알림을 받을 수 없어요!');
    }
  });
};

export default initiateFirebaseMessaging;
