import styled from 'styled-components';
import Button from '../../../shared/atoms/Button';
import Text from '../../../shared/atoms/Text';
import { Qoin } from '../../../../assets/svgs';

interface ChallengeProps {
  title?: string;
  condition?: string;
  coin?: number;
}

export default function ChallengeCard({ title, condition, coin }: ChallengeProps) {
  return (
    <Container>
      <CardContainer>
        <LeftContainer>
          <EarnCoin>
            <Qoin width={'24px'} height={'24px'} />
            <AmountCoin>{coin}</AmountCoin>
          </EarnCoin>
          <TextContainer>
            <ChallengeTitle typography="title">{title}</ChallengeTitle>
            <ChallengeCondition typography="main" color="var(--MR_GRAY2)">
              {condition}
            </ChallengeCondition>
          </TextContainer>
        </LeftContainer>
        <Button size="small">받기</Button>
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 8px;
`;

const CardContainer = styled.div`
  border-radius: 0.5rem;
  border-style: solid;
  border-color: #e0e0e0;
  border-width: 0.4px;
  background-color: var(--MR_WHITE);
  padding: 0.75rem 1.4rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EarnCoin = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

const AmountCoin = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: var(--MR_GRAY2);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const ChallengeTitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  line-height: 0;
`;

const ChallengeCondition = styled(Text)`
  font-size: 14px;
  line-height: 0;
`;
