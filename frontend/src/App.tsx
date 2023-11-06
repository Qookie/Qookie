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

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('curUser: ', currentUser);
      setUser(currentUser);
    });

    initiateFirebaseMessaging();

    return () => unsubscribe();
  }, []);

  return (
    <RecoilRoot>
      <UserContext.Provider value={user}>
        <Layout>
          <GlobalStyle />
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
  @media screen and (min-width: 431px) {
    margin: 0 auto;
  }
`;

export default App;
