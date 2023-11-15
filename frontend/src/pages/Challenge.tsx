import styled from 'styled-components';
import TitleLayout from '../components/shared/Template/TitleLayout';
import Text from '../components/shared/atoms/Text';
import ChallengeCard from '../components/challenge/molecules/ChallengeCard';
import { http } from '../api/instance';
import { useEffect, useState } from 'react';
import { ChallengeProps } from '../components/challenge/molecules/ChallengeCard';
import { useNavigate } from 'react-router-dom';

interface ResProps {
  msg: string;
  payload: {
    monthlyChallenge: ChallengeProps[];
    badgeChallenge: ChallengeProps[];
  };
}

export default function Challenge() {
  const [monthly, setMonthly] = useState<ChallengeProps[]>([]);
  const [badge, setBadge] = useState<ChallengeProps[]>([]);
  const navigate = useNavigate();

  const getChallenge = async () => {
    try {
      const res = await http.get<ResProps>('/api/quest/challenge');
      setMonthly(res.payload.monthlyChallenge);
      setBadge(res.payload.badgeChallenge);
    } catch (e) {
      console.log('completeChallenge Error : ', e);
    }
  };
  
  useEffect(() => {
    getChallenge();
  }, []);

  return (
    <Container>
      <TitleLayout
        title="챌린지"
        desc={
          '꾸준한 하루를 모아 더 큰 목표에 도전해 보세요.\n챌린지 달성 성공 시, 배지가 지급됩니다.'
        }
      />
      <ClickableText typography="main" color="var(--MR_GRAY2)" onClick={() => navigate('/badge')}>
        내 배지 확인하기 {'>'}
      </ClickableText>

      <ChallengeContainer>
        <TitleText typography="title" color="var(--MR_BLACK)">
          이번 달 진행 중
        </TitleText>
        {monthly.map((data, index) => (
          <ChallengeCard
            key={index}
            challengeName={data.challengeName}
            curCnt={data.curCnt}
            totalCnt={data.totalCnt}
            coin={data.coin}
            questName={data.questName}
            status={data.status}
            badgeId={data.badgeId}
            onUpdate={getChallenge}
          />
        ))}
      </ChallengeContainer>

      <ChallengeContainer>
        <TitleText typography="title" color="var(--MR_BLACK)">
          배지 챌린지
        </TitleText>
        {badge.map((data, index) => (
          <ChallengeCard
            key={index}
            challengeName={data.challengeName}
            curCnt={data.curCnt}
            totalCnt={data.totalCnt}
            coin={data.coin}
            questName={data.questName}
            status={data.status}
            badgeId={data.badgeId}
            onUpdate={getChallenge}
          />
        ))}
      </ChallengeContainer>
    </Container>
  );
}

const ChallengeText = styled(Text)`
  font-weight: 600;
  margin-bottom: 20px;
`;

const TitleText = styled(ChallengeText)`
  margin-top: 32px;
`;

const ClickableText = styled(Text)`
  font-weight: 600;
  text-align: right;
  margin-top: 16px;
  margin-bottom: 20px;
  padding: 0 1rem;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChallengeContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;
