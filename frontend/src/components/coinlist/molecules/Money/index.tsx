import styled from 'styled-components';
import { Qoin } from '../../../../assets/svgs';
import { Exp } from '../../../../assets/svgs';
import Text from '../../../shared/atoms/Text';

interface MoneyProps {
  MoneyTheme?: 'default' | 'disabled';
}

export default function Money({ MoneyTheme = 'default' }: MoneyProps) {
  const coin = 200;
  const exp = 200;

  return (
    <MoneyCard MoneyTheme={MoneyTheme}>
      <StyledText>적립된 보상</StyledText>
      <Container>
        <ExpContainer>
          <Exp width={20} height={20} />
          {exp}
        </ExpContainer>
        |
        <CoinContainer>
          <Qoin width={20} height={20} />
          {coin}
        </CoinContainer>
      </Container>
    </MoneyCard>
  );
}

const MoneyCard = styled.div<MoneyProps>`
  width: 100%;
  height: 65px;
  position: relative;
  border-radius: 0.5rem;
  color: var(--MR_WHITE);
  font-weight: 600;
  font-size: 20px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 1rem 0rem;

  ${({ MoneyTheme }) =>
    MoneyTheme === 'disabled' ? 'background: var(--MR_GRAY2)' : 'background: var(--MR_RED)'}
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
`;

const ExpContainer = styled.div`
  width: 22.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoinContainer = styled.div`
  width: 22.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled(Text)`
  margin-left: 20px;
  font-weight: 400;
`;
