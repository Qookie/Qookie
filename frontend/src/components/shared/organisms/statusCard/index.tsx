import styled from 'styled-components';
import Level from '../../molecules/Level';
import ProgressBar from '../../atoms/ProgressBar';

export interface StatusCardProps {
  level: number;
  exp: number;
}

export default function StatusCard({ level, exp }: StatusCardProps) {
  const getTotal = (level: number) => {
    if (level >= 5 && level <= 9) {
      return 12;
    } else if (level >= 10 && level <= 19) {
      return 20;
    } else if (level >= 20 && level <= 29) {
      return 30;
    } else if (level >= 30 && level <= 39) {
      return 40;
    } else if (level >= 40) {
      return 50;
    }
    return 10;
  };

  return (
    <Container>
      <CardContainer>
        <Level level={level} />
        <RightContainer>
          <QookieInfo>
            <QookieName>김쿠키</QookieName>6일째
          </QookieInfo>
          <ProgressBar total={getTotal(level)} now={exp} level={level} />
        </RightContainer>
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 3rem;
  width: 100%;
  position: relative;
`;

const CardContainer = styled.div`
  height: 3rem;
  border-radius: 0.5rem;
  background-color: var(--MR_WHITE);
  box-shadow: 2px 4px 12px 0px rgba(224, 224, 224, 0.3);
  padding: 0.75rem 1.4rem;
  display: flex;
  gap: 1rem;
`;

const QookieInfo = styled.div`
  display: flex;
  gap: 0.4rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  color: var(--MR_GRAY1);
`;
const QookieName = styled.div`
  font-weight: 700;
  color: var(--MR_BLACK);
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
