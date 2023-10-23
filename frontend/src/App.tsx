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
  margin: 0 auto;
  min-height: 100vh;
`;

export default App;
