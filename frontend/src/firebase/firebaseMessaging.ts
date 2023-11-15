import { messaging } from './firebaseConfig';
import { getToken, onMessage, isSupported } from '@firebase/messaging';
import { showToast } from '../components/shared/molecules/Alert';

const initiateFirebaseMessaging = () => {
  // get permission from user
  void Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      // TODO: move vapid key to .env file
      getToken(messaging, {
        vapidKey:
          'BFDtwwUfuzdxNUWEds5C6AuVIyJRyiB2S9qVRfCXA-moG9Lfn6JNu6sc5L2DaXDHoiW0iC3vJBLEqwkRTsxblcQ',
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
      console.log('notification permission denied');
    }
  });
};

export default initiateFirebaseMessaging;
