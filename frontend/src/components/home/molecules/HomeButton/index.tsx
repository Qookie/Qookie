import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ButtonHTMLAttributes } from 'react';
import Text from '../../../shared/atoms/Text';
import { CalendarDaysIcon, StarIcon } from '@heroicons/react/24/outline';

interface HomeBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function HomeButton({ title }: HomeBtnProps) {
  const navigate = useNavigate();

  // router 페이지 링크 등록 후 변경 필요
  const handleClick = () => {
    if (title === '출석체크') {
      navigate('/check');
    } else {
      navigate('/challenge');
    }
  };

  return (
    <ItemContainer title={title} onClick={handleClick}>
      <Text typography="button">{title}</Text>
      <IconContainer title={title}>
        {title == '출석체크' ? <CalendarDaysIcon /> : <StarIcon />}
      </IconContainer>
    </ItemContainer>
  );
}

const ItemContainer = styled.div<HomeBtnProps>`
  color: ${({ title }) => (title == '출석체크' ? 'var(--MR_WHITE)' : 'var(--MR_BLACK)')};
  padding: 1rem 0.5rem 0.5rem 1rem;
  width: 100%;
  height: 4.75rem;
  box-sizing: border-box;
  background-color: ${({ title }) => (title == '출석체크' ? 'var(--MR_RED)' : 'transparent')};
  border-radius: 0.5rem;
  ${({ title }) => title !== '출석체크' && 'border: 1px solid var(--MR_GRAY1)'};
`;

const IconContainer = styled.div<HomeBtnProps>`
  color: ${({ title }) => (title == '출석체크' ? 'var(--MR_WHITE)' : 'var(--MR_RED)')};
  width: 2rem;
  margin-left: auto;
`;
