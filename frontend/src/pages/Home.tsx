import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import { useEffect } from 'react';
import { qookieApi } from '../api';
import QookieStatus from '../components/shared/organisms/QookieStatus';

const Home = () => {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);

  // qookie Api 수정 후 setQookie수정 필요
  // useEffect(() => {
  //   qookieApi.getQookieInfo().then((res) => setQookie({...qookie, ...res}));
  // });

  return (
    <HomeContainer>
      <QookieStatus {...qookie} />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div``;
