import './index.css';
import Router from './router/Router';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
// firebase cloud messaging
import { messaging } from './firebase/firebaseConfig';
import { getToken } from '@firebase/messaging';
import { http } from './api/instance';
// setUser
import { auth } from './firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import Toast from './components/shared/molecules/Alert';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const updateToken = async () => {
    if (Notification.permission === 'granted') {
      var currentToken = localStorage.getItem('messageToken');
      if (currentToken === null) {
        currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
      }
      http.post('/api/member/message/', { messageToken: currentToken });
      localStorage.setItem('messageToken', currentToken);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }

    updateToken();

    window.addEventListener('beforeinstallprompt', function (e) {});

    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    return () => unsubscribe();
  }, []);

  return (
    <RecoilRoot>
      <Layout>
        <GlobalStyle />
        <Toast />
        <Router />
      </Layout>
    </RecoilRoot>
  );
}

const Layout = styled.div`
  max-width: 430px;
  width: 100%;
  min-height: 100vh;
  position: relative;
  height: 1px;
  padding-bottom: env(safe-area-inset-bottom);
  @media screen and (min-width: 431px) {
    margin: 0 auto;
  }
`;

export default App;
