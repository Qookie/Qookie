import Router from './router/Router';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';

function App() {
  return (
    <Layout>
      <GlobalStyle />
      <Router />
    </Layout>
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
