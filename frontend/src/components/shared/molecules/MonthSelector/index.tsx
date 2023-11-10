import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface MonthSelectorProps {
  onClick?: () => void;
  onClickNextMonth: (nextMonth: number) => void;
  onClickPrevMonth: (prevMonth: number) => void;
  selectedMonth: number;
}

export default function MonthSelector({
  onClick,
  onClickNextMonth,
  onClickPrevMonth,
  selectedMonth,
}: MonthSelectorProps) {
  const handlePreviousMonth = () => {
    onClickNextMonth((selectedMonth + 11) % 12 || 12);
  };

  const handleNextMonth = () => {
    onClickPrevMonth((selectedMonth % 12) + 1);
  };

  return (
    <Container>
      <Chevrons>
        <ChevronLeftIcon onClick={handlePreviousMonth} strokeWidth={3} />
      </Chevrons>
      <MonthText onClick={onClick}>{selectedMonth}월</MonthText>
      <Chevrons>
        <ChevronRightIcon onClick={handleNextMonth} strokeWidth={3} />
      </Chevrons>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MonthText = styled(Text)`
  width: 3rem;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const Chevrons = styled.div`
  width: 1.2rem;
  height: 1.2rem;
`;
