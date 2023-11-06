import styled from 'styled-components';
import {
  BeakerIcon,
  BoltIcon,
  CakeIcon,
  CameraIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MusicalNoteIcon,
  SparklesIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { ButtonHTMLAttributes } from 'react';

export const questList = [
  'wake',
  'eat',
  'walk',
  'squat',
  'promise',
  'photo',
  'strech',
  'meditation',
  'water',
] as const;
export type Quest = (typeof questList)[number];

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  quest: Quest;
}

export default function QuestListItem({ quest }: Props) {
  const navigate = useNavigate();
  const { icon, intro, text } = QUEST_CONTENT[quest];

  const handleClick = () => {
    navigate(`/quest/${quest}`);
  };

  return (
    <ItemContainer onClick={handleClick}>
      <Text>
        <IntroText>{intro}</IntroText>
        {text}
      </Text>
      <Icon>{icon}</Icon>
    </ItemContainer>
  );
}

const QUEST_CONTENT = {
  wake: {
    icon: <ClockIcon />,
    intro: '일찍 일어나서,',
    text: '기상 체크!',
  },
  eat: {
    icon: <CakeIcon />,
    intro: '규칙적인 하루 습관,',
    text: '식사',
  },
  walk: {
    icon: <SunIcon />,
    intro: '상쾌한 공기와 함께,',
    text: '산책',
  },
  squat: {
    icon: <BoltIcon />,
    intro: '다섯번만 더,',
    text: '스쿼트',
  },
  promise: {
    icon: <ChatBubbleLeftRightIcon />,
    intro: '친구들과 오랜만에,',
    text: '약속',
  },
  photo: {
    icon: <CameraIcon />,
    intro: '오늘 하늘 어때?,',
    text: '사진 찍기',
  },
  strech: {
    icon: <SparklesIcon />,
    intro: '잠깐 시간내서,',
    text: '스트레칭',
  },
  meditation: {
    icon: <MusicalNoteIcon />,
    intro: '마음을 편안하게,',
    text: '명상',
  },
  water: {
    icon: <BeakerIcon />,
    intro: '우리 몸의 필수,',
    text: '물 마시기',
  },
};

const ItemContainer = styled.div`
  color: var(--MR_RED);
  padding: 1.1rem 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const Text = styled.div`
  display: inline-flex;
  gap: 0.5rem;
  color: var(--MR_BLACK);
  font-size: 1rem;
  font-weight: 700;
  line-height: 125%;
`;

const IntroText = styled.div`
  color: var(--MR_GRAY2);
  font-weight: 600;
`;

const Icon = styled.div`
  width: 2rem;
  height: 2rem;
`;
