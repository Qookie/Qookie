import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Money from '../components/coinlist/molecules/Money';
import MonthSelector from '../components/shared/molecules/MonthSelector';
import TitleLayout from '../components/shared/Template/TitleLayout';
import RewardData from '../components/coinlist/molecules/RewardData';
import moment, { Moment } from 'moment';
import BottomDatePicker from '../components/shared/organisms/BottomDatePicker';
import { http } from '../api/instance';
import Error from '../components/shared/atoms/error';

interface coinProps {
  totalCoin?: number;
  message?: string;
  cost?: number;
  createdAt?: string;
}

export default function Coinlist() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [today, setToday] = useState<Moment>(moment());
  const [coinData, setCoinData] = useState<coinProps[]>([]);
  const [totalCoin, setTotalCoin] = useState<number>(0);

  const getCoinlist = async () => {
    const curYear = today.get('y');
    const curMonth = String(today.month() + 1).padStart(2, '0');
    try {
      const res = await http.get<any>(`/api/member/history/${curYear}/${curMonth}`);
      setCoinData(res.payload.list);
      setTotalCoin(res.payload.totalCoin);
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
    getCoinlist();
  }, [today]);

  return (
    <Container>
      <TopContainer>
				<TitleLayout title={'재화 목록'}/>
        <Money qoin={totalCoin} />
      </TopContainer>
      <Divider />
      <BottomContainer>
        <MonthSelector
          onClick={onMonthSelectorClick}
          onClickNextMonth={onChangeMonth}
          onClickPrevMonth={onChangeMonth}
          selectedMonth={today.month() + 1}
        />
        {coinData && coinData.length > 0 ? (
          coinData.map((data, index) => (
            <RewardData
              key={index}
              createdAt={data.createdAt?.substring(5, 10)}
              message={data.message}
              cost={data.cost}
            />
          ))
        ) : (
          <Nothing>
            <Error children="데이터가 없어요!" />
          </Nothing>
        )}
      </BottomContainer>
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

const TopContainer = styled.div`
  padding: 0 1rem;
`;

const BottomContainer = styled.div`
  padding: 0 1rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(224, 224, 224, 0.25);
  margin: 40px 0;
`;

const Nothing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
`;
