import styled from 'styled-components';
import Money from '../components/coinlist/molecules/Money';
import Text from '../components/shared/atoms/Text';
import MonthSelector from '../components/coinlist/molecules/MonthSelector';
import RewardData from '../components/coinlist/molecules/RewardData';

export default function Coinlist() {
  return (
    <Container>
      <TopContainer>
        <CoinlistText typography="title" color="var(--MR_BLACK)">
          재화 목록
        </CoinlistText>
        <Money />
      </TopContainer>
      <Divider />
      <BottomContainer>
        <MonthSelector />
        <RewardData date={'10.12'} title={'기상 퀘스트 달성 보상'} qoin={10} />
        <RewardData date={'10.12'} title={'식사 퀘스트 달성 보상'} qoin={10} />
        <RewardData date={'10.12'} title={'토끼귀 구매'} qoin={-10} />
        <RewardData date={'10.11'} title={'10월 기상 챌린지 달성 보상'} qoin={100} />
        <RewardData date={'10.11'} title={'기상 퀘스트 달성 보상'} qoin={10} />
      </BottomContainer>
    </Container>
  );
}

const Container = styled.div``;

const TopContainer = styled.div`
  margin-top: 80px;
  padding: 0 1rem;
`;

const BottomContainer = styled.div`
  padding: 0 1rem;
`;

const CoinlistText = styled(Text)`
  font-weight: 600;
`;

const Divider = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(224, 224, 224, 0.25);
  margin: 40px 0;
`;
