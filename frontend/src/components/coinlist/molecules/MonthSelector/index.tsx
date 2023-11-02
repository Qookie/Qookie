import { useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const MonthState = atom({
  key: 'month',
  default: new Date().getMonth(),
});

export default function MonthSelector() {
  const [selectedMonth, setSelectedMonth] = useRecoilState(MonthState);

  const handlePreviousMonth = () => {
    if (selectedMonth > 1) {
      setSelectedMonth(selectedMonth - 1);
    } else {
      setSelectedMonth(12);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth < 12) {
      setSelectedMonth(selectedMonth + 1);
    } else {
      setSelectedMonth(1);
    }
  };

  return (
    <Container>
      <Chevrons>
        <ChevronLeftIcon onClick={handlePreviousMonth} strokeWidth={3} />
      </Chevrons>
      <MonthText>{selectedMonth}월</MonthText>
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
