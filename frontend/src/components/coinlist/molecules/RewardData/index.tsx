import styled from 'styled-components';
import { Qoin } from '../../../../assets/svgs';
import Text from '../../../shared/atoms/Text';

interface RewardProps {
  createdAt?: string;
  message?: string;
  cost?: number;
}

export default function RewardData({ createdAt, message, cost }: RewardProps) {
  return (
    <Container>
      <LeftContainer>
        <DateText>{createdAt}</DateText>
        <Quest>{message}</Quest>
      </LeftContainer>
      <RewardContainer>
        <Qoin width={15} height={15} />
        <Reward cost={cost}>{cost}</Reward>
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
`;

const RewardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Quest = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

const Reward = styled(Text)<{cost?: number}>`
  font-size: 20px;
  font-weight: 600;
  color: ${({ cost }) => (cost && cost >= 0 ? 'var(--MR_GRAY2)' : 'red')};
`;

const DateText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: var(--MR_GRAY2);
`;
