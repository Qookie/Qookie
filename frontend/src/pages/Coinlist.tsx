import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Money from '../components/coinlist/molecules/Money';
import Text from '../components/shared/atoms/Text';
import MonthSelector from '../components/shared/molecules/MonthSelector';
import RewardData from '../components/coinlist/molecules/RewardData';
import moment, { Moment } from 'moment';
import BottomDatePicker from '../components/shared/organisms/BottomDatePicker';

export default function Coinlist() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [today, setToday] = useState<Moment>(moment());

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

  return (
    <Container>
      <TopContainer>
        <CoinlistText typography="title" color="var(--MR_BLACK)">
          재화 목록
        </CoinlistText>
        <Money />
      </TopContainer>
      <Divider />
      <BottomContainer>
        <MonthSelector
          onClick={onMonthSelectorClick}
          onClickNextMonth={onChangeMonth}
          onClickPrevMonth={onChangeMonth}
          selectedMonth={today.month() + 1}
        />
        <RewardData date={'10.12'} title={'기상 퀘스트 달성 보상'} qoin={10} />
        <RewardData date={'10.12'} title={'식사 퀘스트 달성 보상'} qoin={10} />
        <RewardData date={'10.12'} title={'토끼귀 구매'} qoin={-10} />
        <RewardData date={'10.11'} title={'10월 기상 챌린지 달성 보상'} qoin={100} />
        <RewardData date={'10.11'} title={'기상 퀘스트 달성 보상'} qoin={10} />
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
  margin-top: 80px;
  padding: 0 1rem;
`;

const BottomContainer = styled.div`
  padding: 0 1rem;
`;

const CoinlistText = styled(Text)`
  font-weight: 600;
`;

const Divider = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(224, 224, 224, 0.25);
  margin: 40px 0;
`;
