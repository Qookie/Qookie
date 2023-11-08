import styled from 'styled-components';
import { Qoin } from '../../../../assets/svgs';
import Text from '../../../shared/atoms/Text';

interface MoneyProps {
  MoneyTheme?: 'default' | 'disabled';
}

export default function Money({ MoneyTheme = 'default' }: MoneyProps) {
  const coin = 14200;

  return (
    <MoneyCard MoneyTheme={MoneyTheme}>
      <StyledText>보유 코인</StyledText>
      <Container>
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
  margin: 40px 0;

  ${({ MoneyTheme }) =>
    MoneyTheme === 'disabled' ? 'background: var(--MR_GRAY2)' : 'background: var(--MR_RED)'}
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CoinContainer = styled.div`
  width: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`;

const StyledText = styled(Text)`
  margin-left: 20px;
  font-weight: 400;
`;
