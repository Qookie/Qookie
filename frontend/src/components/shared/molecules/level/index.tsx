import styled from 'styled-components';
import { Lv1, Lv2, Lv3, Lv4, Lv5, Lv6 } from '../../../../assets/svgs';

export interface LevelProps {
  level: number;
}

const getLevelIcon = (level: number) => {
  if (level >= 5 && level <= 9) {
    return <Lv2 />;
  } else if (level >= 10 && level <= 19) {
    return <Lv3 />;
  } else if (level >= 20 && level <= 29) {
    return <Lv4 />;
  } else if (level >= 30 && level <= 39) {
    return <Lv5 />;
  } else if (level >= 40) {
    return <Lv6 />;
  }
  return <Lv1 />;
};

export default function Level({ level }: LevelProps) {
  return (
    <LevelContainer>
      {getLevelIcon(level)}
      <LevelText level={level}>Lv.{level}</LevelText>
    </LevelContainer>
  );
}

const LevelContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
`;

const LevelText = styled.div<LevelProps>`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  color: ${({ level }) => getLevelColor(level)};
`;

const getLevelColor = (level: number) => {
  if (level >= 5 && level <= 9) {
    return '#92AAFF';
  } else if (level >= 10 && level <= 19) {
    return '#C883FF';
  } else if (level >= 20 && level <= 29) {
    return '#FF8ED8';
  } else if (level >= 30 && level <= 39) {
    return '#FF9797';
  } else if (level >= 40) {
    return '#FFD25D';
  }
  return '#A3FF8C';
};
