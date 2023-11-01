import React, { useState } from 'react';
import TitleLayout from '../components/shared/Template/TitleLayout';
import TimePicker from '../components/shared/molecules/TimePicker';
import styled from 'styled-components';
import { useTimePick } from '../hooks/useTimePick';
import Button from '../components/shared/atoms/Button';
import { http } from '../api/instance';
import { useNavigate } from 'react-router';

export interface Time {
  hour: string;
  minute: string;
  meridiem: string;
}

function SetWakeupTime() {
  const navigate = useNavigate();
  const cur = new Date();

  const { time, setHour, setMeridiem, setMinute } = useTimePick({
    hour: String(cur.getHours()).padStart(2, '0'),
    minute: String(cur.getMinutes()).padStart(2, '0'),
    meridiem: cur.getHours() >= 12 ? 'AM' : 'PM',
  });

  const hourOf24HourFormat =
    time.meridiem === 'AM'
      ? String(parseInt(time.hour) % 12).padStart(2, '0')
      : String((parseInt(time.hour) % 12) + 12);

  const onClickComplete = async () => {
    const { hour, minute } = time;

    try {
      await http.post('/api/member/time', {
        wakeTime: `${hour}:${minute}:00`,
      });

      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TitleLayout title="기상 시간을 설정해주세요">
      <ClockContainer>
        <Clock>{hourOf24HourFormat[0]}</Clock>
        <Clock>{hourOf24HourFormat[1]}</Clock>
        <ClockSplit>:</ClockSplit>
        <Clock>{time.minute[0]}</Clock>
        <Clock>{time.minute[1]}</Clock>
      </ClockContainer>
      <TimePicker
        time={time}
        onSelectHour={setHour}
        onSelectMinute={setMinute}
        onSelectMeridiem={setMeridiem}
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
