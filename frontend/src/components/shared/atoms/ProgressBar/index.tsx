import styled from 'styled-components';

export interface ProgressProps {
  total: number;
  now: number;
  level?: number;
}

export default function ProgressBar({ total, now, level }: ProgressProps) {
  return (
    <Container>
      <NowContainer total={total} now={now} level={level} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 0.55rem;
  background-color: var(--MR_GRAY1);
  border-radius: 0.25rem;
`;

const NowContainer = styled.div<ProgressProps>`
  width: ${({ now, total }) => now && `calc(${(now / total) * 100}%)`};
  height: 0.55rem;
  background-color: ${({ level }) => (level ? getLevelColor(level) : 'var(--MR_YELLOW)')};
  border-radius: 0.25rem;
`;

const getLevelColor = (level: number) => {
  if (level >= 5 && level <= 9) {
    return '#2F5DFF';
  } else if (level >= 10 && level <= 19) {
    return '#A32FFF';
  } else if (level >= 20 && level <= 29) {
    return '#FF48C1';
  } else if (level >= 30 && level <= 39) {
    return '#FF4848';
  } else if (level >= 40) {
    return 'var(--MR_YELLOW)';
  }
  return '#59FF2F';
};
