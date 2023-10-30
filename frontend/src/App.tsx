import './index.css';
import Router from './router/Router';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
// firebase cloud messaging
import initiateFirebaseMessaging from './firebase/firebaseMessaging';

function App() {
  // TODO: move this to when new user register or login
  initiateFirebaseMessaging();
  return (
    <RecoilRoot>
      <Layout>
        <GlobalStyle />
        <Router />
      </Layout>
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
