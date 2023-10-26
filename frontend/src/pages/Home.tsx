import Qookie from '../components/shared/molecules/Qookie';
import styled from 'styled-components';
import StatusCard from '../components/shared/organisms/StatusCard';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';

const Home = () => {
  const [qookie, setqookie] = useRecoilState(QookieInfoState);

  return (
    <HomeContainer>
      <Qookie />
      <ContentsWrapper>
        <StatusCard level={qookie.level} exp={qookie.exp} />
      </ContentsWrapper>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  padding-top: 4rem;
`;

const ContentsWrapper = styled.div`
  padding: 3rem 1rem 0 1rem;
`;
