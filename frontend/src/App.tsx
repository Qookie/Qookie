import './index.css';
import Router from './router/Router';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
// firebase cloud messaging
import initiateFirebaseMessaging from './firebase/firebaseMessaging';
// setUser
import { auth } from './firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from './firebase/firebaseAuth';
import Toast from './components/shared/molecules/Alert';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    initiateFirebaseMessaging();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }

    window.addEventListener('beforeinstallprompt', function (e) {});

    return () => unsubscribe();
  }, []);

  return (
    <RecoilRoot>
      <UserContext.Provider value={user}>
        <Layout>
          <GlobalStyle />
          <Toast />
          <Router />
        </Layout>
      </UserContext.Provider>
    </RecoilRoot>
  );
}

const Layout = styled.div`
  max-width: 430px;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
  height: 1px;
  @media screen and (min-width: 431px) {
    margin: 0 auto;
  }
`;

export default App;
