import { messaging } from './firebaseConfig';
import { getToken, onMessage, isSupported } from '@firebase/messaging';
import { showToast } from '../components/shared/molecules/Alert';
import { http } from '../api/instance';

type UpdateMessageTokenResponse = {
  msg: string;
};

const initiateFirebaseMessaging = () => {
  // get permission from user
  void Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            http.post<UpdateMessageTokenResponse>('/api/member/message/', {
              messageToken: currentToken,
            });
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
      alert(
        '알림이 허용되지 않았습니다.\n브라우저 설정에서 k9a504.p.ssafy.io 알림을 허용해주세요!',
      );
    }
  });
};

export default initiateFirebaseMessaging;
