import styled from 'styled-components';
import Text from '../components/shared/atoms/Text';
import ChallengeCard from '../components/challenge/molecules/ChallengeCard';

export default function Challenge() {
  return (
    <Container>
      <TitleContainer>
        <ChallengeText typography="title" color="var(--MR_BLACK)">
          챌린지
        </ChallengeText>
        <Text typography="main" color="var(--MR_GRAY2)">
          꾸준한 하루를 모아 더 큰 목표에 도전해 보세요.
        </Text>
        <Text typography="main" color="var(--MR_GRAY2)">
          챌린지 달성 성공 시, 배지가 지급됩니다.
        </Text>
        <ClickableText typography="main" color="var(--MR_GRAY2)">
          내 배지 확인하기 {'>'}
        </ClickableText>
      </TitleContainer>

      <ChallengeContainer>
        <TitleText typography="title" color="var(--MR_BLACK)">
          이번 달 진행 중
        </TitleText>
        <ChallengeCard title="15일 기상 챌린지" condition="15일 / 15일" coin={100} />
        <ChallengeCard title="규칙적인 식사" condition="5일 / 15일" coin={100} />
        <ChallengeCard title="30000 걸음" condition="10일 / 10일" coin={100} />
      </ChallengeContainer>

      <ChallengeContainer>
        <TitleText typography="title" color="var(--MR_BLACK)">
          배지 챌린지
        </TitleText>
        <ChallengeCard title="상쾌한 아침과 함께" condition="10일 / 10일" coin={50} />
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
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TitleContainer = styled.div`
  padding: 0 1rem;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
`;

const ChallengeContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;
