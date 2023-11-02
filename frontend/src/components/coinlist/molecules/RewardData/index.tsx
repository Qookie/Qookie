import styled from 'styled-components';
import { Qoin } from '../../../../assets/svgs';
import Text from '../../../shared/atoms/Text';

interface RewardProps {
  date?: string;
  title?: string;
  qoin?: number;
}

export default function RewardData({ date, title, qoin }: RewardProps) {
  return (
    <Container>
      <LeftContainer>
        <DateText>{date}</DateText>
        <Quest>{title}</Quest>
      </LeftContainer>
      <RewardContainer>
        <Qoin width={15} height={15} />
        <Reward>{qoin}</Reward>
      </RewardContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const RewardContainer = styled.div`
  width: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const Quest = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

const Reward = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: var(--MR_GRAY2);
`;

const DateText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: var(--MR_GRAY2);
`;
