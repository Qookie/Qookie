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

const NOT_SELECTED = -1;

const IconMap: {
  [key in QuestId]: React.ReactNode;
} = {
  [QuestId.WAKE]: <AlarmClockIcon />,
  [QuestId.EAT]: <SaladIcon />,
  [QuestId.WALK]: <ForestIcon />,
  [QuestId.SQUAT]: <SquatIcon />,
  [QuestId.PROMISE]: <CupIcon />,
  [QuestId.PHOTO]: <SkyIcon />,
  [QuestId.STRETCH]: <StretchingIcon />,
  [QuestId.MEDITATION]: <HeartIcon />,
  [QuestId.WATER]: <WaterIcon />,
  [QuestId.ATTENDANCE]: <></>,
};

function History() {
  const [today, setToday] = useState<Moment>(moment());
  const [monthlyQuest, setmonthlyQuest] = useState<DateQuest>({});
  const [selectedDate, setSelectedDate] = useState<number>(NOT_SELECTED);

  console.log(IconMap);

  // 현재 선택된 일자 있으면
  const fetchCalendar = async () => {
    const curYear = today.get('y');
    const curMonth = String(today.month() + 1).padStart(2, '0');
    const { payload } = await http.get<CalendarResponse>(
      `/api/member/calender/${curYear}/${curMonth}`,
    );

    setmonthlyQuest(payload);
  };

  // payload : key에 접근해서 수행한 퀘스트가 몇개인지 체크 후 개수에 따라서 스타일을 지정해주면 될듯

  const dateStyle = Object.keys(monthlyQuest).reduce<Record<string, string>>((acc, date) => {
    const questsList = monthlyQuest[date];
    const questCount = questsList.reduce<number>((acc, cur) => {
      return !cur ? acc : acc + 1;
    }, 0);
    acc[date] = getStyle(questCount);
    return acc;
  }, {});

  const onClickDate = (date: Moment) => {
    setSelectedDate(date.date());
  };

  useEffect(() => {
    fetchCalendar();
  }, [today]);

  return (
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
        {// 선택할 날짜
        monthlyQuest[selectedDate]?.map((cur: QuestStatus, idx: number) => {
          if (idx === 0) {
            return <></>;
          }

          console.log(idx as QuestId);
          return cur?.finish ? IconMap[idx as QuestId] : <></>;
        })
        //수행한 퀘스트 아이콘들
        // 이미지가 있는 퀘스트면 선택시 등록한 이미지가 보여야함
        }
      </QuestContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 1rem;
`;

const CalendarContainer = styled.div``;
const QuestContainer = styled.div``;

export default History;
