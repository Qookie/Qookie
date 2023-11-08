import React, { useEffect, useState } from 'react';
import BottomSheet, { BottomModalProps } from '../../molecules/BottomSheet';
import DatePicker from '../../molecules/DatePicker';
import { Moment } from 'moment';

interface Props extends Omit<BottomModalProps, 'children' | 'onComplete'> {
  initialTime: Moment;
  onChangeYearMonth: (nextYearMonth: Moment) => void;
}

function BottomDatePicker({ isOpen, title, onClose, initialTime, onChangeYearMonth }: Props) {
  const [today, setToday] = useState<Moment>(initialTime);

  const onChangeMonth = (nextMonth: number) => {
    setToday((prev) => prev.clone().month(nextMonth - 1));
  };

  const onChangeYear = (nextYear: number) => {
    setToday((prev) => prev.clone().year(nextYear));
  };

  const onComplete = () => {
    onChangeYearMonth(today);
  };

  useEffect(() => {
    setToday(initialTime);
  }, [initialTime]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={title} onComplete={onComplete}>
      <DatePicker
        year={today.year()}
        month={today.month() + 1}
        onSelectMonth={onChangeMonth}
        onSelectYear={onChangeYear}
      />
    </BottomSheet>
  );
}

export default BottomDatePicker;
