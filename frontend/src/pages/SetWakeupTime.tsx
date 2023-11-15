import TitleLayout from '../components/shared/Template/TitleLayout';
import TimePicker from '../components/shared/molecules/TimePicker';
import styled from 'styled-components';
import { useTimePick } from '../hooks/useTimePick';
import Button from '../components/shared/atoms/Button';
import { http } from '../api/instance';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import moment, { Moment } from 'moment';

export interface Time {
  hour: string;
  minute: string;
  meridiem: string;
}

function SetWakeupTime() {
  const navigate = useNavigate();

  const [today, setToday] = useState<Moment>(moment());

  const onSelectHour = (hour: string) => {
    const hourNumber = parseInt(hour);
    const isAfternoon = today.format('A') === 'PM';
    const nxtHour = isAfternoon ? (hourNumber % 12) + 12 : hourNumber % 12;

    setToday((prev) => prev.clone().set('hour', nxtHour));
  };

  const onSelectMinute = (minute: string) => {
    const minuteNumber = parseInt(minute);

    setToday((prev) => prev.clone().set('minute', minuteNumber));
  };

  const onSelectMeridiem = (day: string) => {
    const hourNumber = today.hour();
    const isAfternoon = day === 'PM';
    const nxtHour = isAfternoon ? (hourNumber % 12) + 12 : hourNumber % 12;

    setToday((prev) => prev.clone().set('hour', nxtHour));
  };

  const onClickComplete = async () => {
    try {
      await http.post('/api/member/time', {
        wakeTime: `${today.hour().toString().padStart(2, '0')}:${today.minute()}:00`,
      });

      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TitleLayout title="기상 시간을 설정해주세요">
      <ClockContainer>
        <Clock>{today.format('HH')[0]}</Clock>
        <Clock>{today.format('HH')[1]}</Clock>
        <ClockSplit>:</ClockSplit>
        <Clock>{today.format('mm')[0]}</Clock>
        <Clock>{today.format('mm')[1]}</Clock>
      </ClockContainer>
      <TimePicker
        time={today}
        onSelectHour={onSelectHour}
        onSelectMinute={onSelectMinute}
        onSelectMeridiem={onSelectMeridiem}
      ></TimePicker>

      <ButtonContainer>
        <Button onClick={onClickComplete}>완료</Button>
      </ButtonContainer>
    </TitleLayout>
  );
}

const ClockContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 2rem;
  margin-bottom: 2.5rem;
`;

const Clock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 10px;
  height: 4rem;
  width: 3rem;
  font-size: 2.5rem;
`;

const ClockSplit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

const ButtonContainer = styled.div`
  margin-top: 2.5rem;
`;

export default SetWakeupTime;
