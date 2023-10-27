import styled from 'styled-components';
import { ReactComponent as Coin } from '../../../../assets/coin.svg';
import Button from '../../../shared/atoms/Button';
import Text from '../../../shared/atoms/Text';

interface ChallengeProps {
  title?: string;
  condition?: string;
  coin?: number;
}

export default function ChallengeCard({ title, condition, coin }: ChallengeProps) {
  return (
    <Container>
      <CardContainer>
        <EarnCoin>
          <Coin />
          <AmountCoin>{coin}</AmountCoin>
        </EarnCoin>
        <TextContainer>
          <Text typography="button">{title}</Text>
          <Text typography="main" color="var(--MR_GRAY2)">
            {condition}
          </Text>
        </TextContainer>
        <Button size="small">확인</Button>
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const CardContainer = styled.div`
  height: 3rem;
  border-radius: 0.5rem;
  border-style: solid;
  border-color: #e0e0e0;
  border-width: 0.4px;
  background-color: var(--MR_WHITE);
  padding: 0.75rem 1.4rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const EarnCoin = styled.div`
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const AmountCoin = styled.div`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  text-align: center;
`;

const TextContainer = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
