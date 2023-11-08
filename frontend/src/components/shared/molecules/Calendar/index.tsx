import React from 'react';
import { Moment } from 'moment';
import styled from 'styled-components';

interface Props {
  month: Moment;
  dateBackground?: {
    [key: string]: string;
  };
  onClickDateCallback?: (date?: Moment) => void;
}

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

function Calendar({ month, dateBackground, onClickDateCallback }: Props) {
  const generateMonthDate = () => {
    const startWeek = month.clone().startOf('month').week();
    const endWeek =
      month.clone().endOf('month').week() === 1 ? 53 : month.clone().endOf('month').week();
    const calendar = [];

    const curMonth = month.format('M');

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <Row key={week}>
          {Array(7)
            .fill(0)
            .map((n: number, i: number) => {
              const date = month
                .clone()
                .week(week)
                .startOf('week')
                .add(n + i, 'day');

              const onClickDate = () => {
                onClickDateCallback?.(date);
              };

              if (curMonth !== date.format('M')) {
                return <Date />;
              }

              const dateString = date.format('D');

              return (
                <Date customStyle={dateBackground?.[dateString]} onClick={onClickDate}>
                  {dateString}
                </Date>
              );
            })}
        </Row>,
      );
    }

    return calendar;
  };

  return (
    <Container>
      <Row>
        {dayOfWeek.map((day: string) => {
          return <Day>{day}</Day>;
        })}
      </Row>

      {generateMonthDate()}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

interface DateProps {
  customStyle?: string;
}

const Date = styled.div<DateProps>`
  box-sizing: border-box;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ customStyle }) => customStyle}
`;

const Day = styled.div`
  box-sizing: border-box;

  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.75rem;
`;

export default Calendar;
