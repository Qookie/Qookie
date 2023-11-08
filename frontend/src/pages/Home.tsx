import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import { useContext, useEffect } from 'react';
import { qookieApi } from '../api';
import QookieStatus from '../components/shared/organisms/QookieStatus';
import QuestList from '../components/home/organisms/QuestList';
import HomeButton from '../components/home/molecules/HomeButton';
import { QookieInfo } from '../types';
import { useNavigate } from 'react-router-dom';
import attendance from '../assets/pngs/calendar.png';
import challenge from '../assets/pngs/challenge.png';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { UserContext } from '../firebase/firebaseAuth';
import { UserState } from '../modules/user';

export interface QookieInfoResponse {
  msg: string;
  payload: QookieInfo | null;
}

const Home = () => {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);
  const navigate = useNavigate();

  // 로그인 후 setQookie 확인 필요
  useEffect(() => {
    qookieApi.getQookieInfo().then((res) => res !== null && setQookie({ ...qookie, ...res }));
  }, []);

  return (
    <HomeContainer>
      <QookieStatus {...qookie} />
      <QuestContainer>
        <ButtonContainer>
          <HomeButton
            title="출석체크"
            icon={attendance}
            customStyle={styleAttendance}
            onClick={() => navigate('/attendance')}
          />
          <HomeButton
            title="챌린지"
            icon={challenge}
            customStyle={styleChallenge}
            onClick={() => navigate('/challenge')}
          />
        </ButtonContainer>
        <QuestList title="일일 퀘스트" />
        <QuestList title="추가 퀘스트" />
      </QuestContainer>
    </HomeContainer>
  );
};

export default Home;

const styleAttendance = {
  color: 'var(--MR_WHITE)',
  backgroundColor: 'var(--MR_RED)',
};

const styleChallenge = {
  color: 'var(--MR_BLACK)',
  backgroundColor: 'transparent',
  border: '1px solid var(--MR_GRAY1)',
};

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
