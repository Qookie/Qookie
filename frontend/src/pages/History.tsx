import React, { useEffect, useState } from 'react';
import Text from '../components/shared/atoms/Text';
import styled from 'styled-components';
import { http } from '../api/instance';
import moment, { Moment } from 'moment';
import Calendar from '../components/shared/molecules/Calendar';
import MonthSelector from '../components/shared/molecules/MonthSelector';
import { QuestId } from '../types/quest';
import { ReactComponent as AlarmClockIcon } from '../assets/svgs/alarm-clock.svg';
import { ReactComponent as SaladIcon } from '../assets/svgs/salad.svg';
import { ReactComponent as ForestIcon } from '../assets/svgs/walk.svg';
import { ReactComponent as SquatIcon } from '../assets/svgs/squat.svg';
import { ReactComponent as CupIcon } from '../assets/svgs/cup.svg';
import { ReactComponent as SkyIcon } from '../assets/svgs/sky.svg';
import { ReactComponent as StretchingIcon } from '../assets/svgs/stretching.svg';
import { ReactComponent as HeartIcon } from '../assets/svgs/heart.svg';
import { ReactComponent as WaterIcon } from '../assets/svgs/water.svg';
import { formatMoment } from '../utils/date';

type QuestStatus = {
  finish: boolean;
  image: string;
} | null;

type DateQuest = { [key: string]: QuestStatus[] };

type CalendarResponse = {
  msg: string;
  payload: DateQuest;
};

const STEP1 = 3;
const STEP2 = 6;
const STEP3 = 9;

const getStyle = (questCnt: number) => {
  if (questCnt <= STEP1) {
    return 'border-radius: 18px; background-color: #FFF2D0';
  } else if (questCnt <= STEP2) {
    return 'border-radius: 18px; background-color: #FFDF8E';
  } else if (questCnt <= STEP3) {
    return 'border-radius: 18px; background-color: var(--MR_YELLOW)';
  }

  return '';
};

const IconMap: {
  [key in QuestId]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
} = {
  [QuestId.WAKE]: AlarmClockIcon,
  [QuestId.EAT]: SaladIcon,
  [QuestId.WALK]: ForestIcon,
  [QuestId.SQUAT]: SquatIcon,
  [QuestId.PROMISE]: CupIcon,
  [QuestId.PHOTO]: SkyIcon,
  [QuestId.STRETCH]: StretchingIcon,
  [QuestId.MEDITATION]: HeartIcon,
  [QuestId.WATER]: WaterIcon,
  [QuestId.ATTENDANCE]: AlarmClockIcon,
};

function History() {
  const [today, setToday] = useState<Moment>(moment());
  const [monthlyQuest, setmonthlyQuest] = useState<DateQuest>({});
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  // 현재 선택된 일자 있으면
  const fetchCalendar = async () => {
    const curYear = today.get('y');
    const curMonth = String(today.month() + 1).padStart(2, '0');
    const { payload } = await http.get<CalendarResponse>(
      `/api/member/calender/${curYear}/${curMonth}`,
    );

    setmonthlyQuest(payload);
  };

  const dateStyle = Object.keys(monthlyQuest).reduce<Record<string, string>>((acc, date) => {
    const questsList = monthlyQuest[date];
    const questCount = questsList.reduce<number>((acc, cur) => {
      return !cur ? acc : acc + 1;
    }, 0);
    acc[date] = getStyle(questCount);
    return acc;
  }, {});

  const onClickDate = (date: Moment) => {
    setSelectedDate(date.clone());
  };

  useEffect(() => {
    fetchCalendar();
  }, [today]);

  return (
    <>
      <Container>
        <Text
          typography="title"
          style={{
            marginTop: '1.5rem',
            marginBottom: '3.75rem',
          }}
        >
          캘린더
        </Text>
        <CalendarContainer>
          <MonthSelector
            onClick={() => {}}
            onClickNextMonth={(temp: number) => {}}
            onClickPrevMonth={(temp: number) => {}}
            selectedMonth={today.month() + 1}
          />
          <Calendar month={today} dateBackground={dateStyle} onClickDateCallback={onClickDate} />
        </CalendarContainer>
        <QuestContainer>
          {selectedDate !== null && (
            <QuestSection>
              <Text color="var(--MR_GRAY2)">{formatMoment(selectedDate)}</Text>
              <QuestList>
                {monthlyQuest[selectedDate.date()]?.map((cur: QuestStatus, check_idx: number) => {
                  if (check_idx === 0) {
                    return <></>;
                  }

                  const Icon = IconMap[check_idx as QuestId];

                  return cur?.finish ? <Icon key={check_idx} /> : <></>;
                })}
              </QuestList>
            </QuestSection>
          )}
        </QuestContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0 1rem;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CalendarContainer = styled.div`
  margin-bottom: 2rem;
`;
const QuestContainer = styled.div`
  background-color: #f7f7f7;
  flex-grow: 1;
`;

const QuestSection = styled.div`
  background-color: white;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
`;

const QuestList = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

export default History;
