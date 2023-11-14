import { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import MonthSelector from '../components/shared/molecules/MonthSelector';
import MessageCard, { MessageProps } from '../components/mind/molcules/MessageCard';
import { http } from '../api/instance';
import BottomDatePicker from '../components/shared/organisms/BottomDatePicker';
import TitleLayout from '../components/shared/Template/TitleLayout';
import Error from '../components/shared/atoms/error';

interface ResProps {
  msg: string, 
  payload: MessageProps[] 
}

export default function PastMind() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [today, setToday] = useState<Moment>(moment());
  const [mindData, setMindData] = useState<MessageProps[]>([]);

  const getMind = async () => {
    const curYear = today.get('y');
    const curMonth = String(today.month() + 1).padStart(2, '0');
    try {
      const res = await http.get<ResProps>(`/api/heart/list/${curYear}/${curMonth}`);
      setMindData(res.payload);
    } catch (e) {
      console.log('coinlist Error : ', e);
    }
  };

  const onClose = () => {
    setIsBottomSheetOpen(false);
  };

  const onMonthSelectorClick = () => {
    setIsBottomSheetOpen(true);
  };

  const onChangeMonth = (nextMonth: number) => {
    setToday((prev) => prev.clone().month(nextMonth - 1));
  };

  const onChangeYearMonth = (nextYearMonth: Moment) => {
    setToday(nextYearMonth.clone());
    setIsBottomSheetOpen(false);
  };

  useEffect(() => {
    getMind();
  }, [today]);

  return (
    <Container>
      <TitleLayout title={'지난 마음'} />
      <MonthSelector
        onClick={onMonthSelectorClick}
        onClickNextMonth={onChangeMonth}
        onClickPrevMonth={onChangeMonth}
        selectedMonth={today.month() + 1}
      />
      {mindData && mindData.length > 0 ? (
        mindData.map((data, index) => (
          <MessageCard
            key={index}
            category={data.category}
            createdAt={data.createdAt}
            content={data.content}
            reply={data.reply}
          />
        ))
      ) : (
        <Nothing>
          <Error children="데이터가 없어요!" />
        </Nothing>
      )}

      <BottomDatePicker
        isOpen={isBottomSheetOpen}
        onClose={onClose}
        initialTime={today}
        title="조회 기간"
        onChangeYearMonth={onChangeYearMonth}
      />
    </Container>
  );
}

const Container = styled.div``;

const Nothing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
`;
