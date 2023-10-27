import Qookie from '../components/shared/molecules/Qookie';
import styled from 'styled-components';
import StatusCard from '../components/shared/organisms/StatusCard';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import { useEffect } from 'react';
import { qookieApi } from '../api';

const Home = () => {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);

  // qookie Api 수정 후 setQookie수정 필요
  // useEffect(() => {
  //   qookieApi.getQookieInfo().then((res) => setQookie({...qookie, ...res}));
  // });

  return (
    <HomeContainer>
      <Qookie {...qookie} />
      <ContentsWrapper>
        <StatusCard level={qookie.level} exp={qookie.exp} />
      </ContentsWrapper>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div``;

const ContentsWrapper = styled.div`
  padding: 0 1rem;
`;
