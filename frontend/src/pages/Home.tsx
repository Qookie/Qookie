import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import { useEffect } from 'react';
import { qookieApi } from '../api';
import QookieStatus from '../components/shared/organisms/QookieStatus';
import QuestList from '../components/home/organisms/QuestList';
import HomeButton from '../components/home/molecules/HomeButton';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);

  // 로그인 후 setQookie 확인 필요
  useEffect(() => {
    qookieApi.getQookieInfo().then((res) => setQookie({ ...qookie, ...res }));
  }, []);

  return (
    <HomeContainer>
      <QookieStatus {...qookie} />
      <QuestContainer>
        <ButtonContainer>
          <HomeButton title="출석체크" />
          <HomeButton title="챌린지" />
        </ButtonContainer>
        <QuestList title="일일 퀘스트" />
        <QuestList title="추가 퀘스트" />
      </QuestContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div``;

const QuestContainer = styled.div`
  display: grid;
  padding: 2.5rem 1rem 6rem 1rem;
  gap: 3rem;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;
