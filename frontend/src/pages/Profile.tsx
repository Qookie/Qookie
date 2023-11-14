import React, { useEffect, useState } from 'react';
import TitleLayout from '../components/shared/Template/TitleLayout';
import Input from '../components/shared/atoms/Input';
import { http } from '../api/instance';
import styled from 'styled-components';
import Button from '../components/shared/atoms/Button';
import TimePicker from '../components/shared/molecules/TimePicker';
import moment, { Moment } from 'moment';
import { useSetRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';

interface Profile {
  memberName: string;
  wakeTime: Moment;
  cookieName: string;
}

interface ProfileResponse {
  msg: string;
  payload: {
    memberName: string;
    wakeTime: string;
    cookieName: string;
  };
}

type Mode = 'EDIT' | 'VIEW';

function Profile() {
  const [profile, setProfile] = useState<Profile>({
    memberName: '',
    wakeTime: moment(),
    cookieName: '',
  });

  const setQookie = useSetRecoilState(QookieInfoState);

  const [mode, setMode] = useState<Mode>('VIEW');

  const fetchProfile = async () => {
    const {
      payload: { memberName, wakeTime, cookieName },
    } = await http.get<ProfileResponse>('/api/member');

    setProfile((prev) => ({
      ...prev,
      memberName,
      wakeTime: moment(wakeTime, 'hh:mm:ss'),
      cookieName,
    }));
  };

  const onChangeMemberName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setProfile((prev) => ({
      ...prev,
      memberName: value,
    }));
  };

  const onChangeCookieName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setProfile((prev) => ({
      ...prev,
      cookieName: value,
    }));
  };
  const { memberName, wakeTime, cookieName } = profile;

  const onClickMainButton = async () => {
    if (mode === 'VIEW') {
      setMode('EDIT');
      return;
    }

    await http.patch('/api/member/modify', {
      memberName,
      cookieName,
      wakeTime: `${wakeTime.hour()}:${wakeTime.minute()}:00`,
    });

    setMode('VIEW');

    setQookie((prev) => ({
      ...prev,
      name: cookieName,
    }));
  };

  const onSelectHour = (hour: string) => {
    const hourNumber = parseInt(hour);
    const isAfternoon = wakeTime.format('A') === 'PM';
    const nxtHour = isAfternoon ? (hourNumber % 12) + 12 : hourNumber % 12;

    setProfile((prev) => ({
      ...prev,
      wakeTime: prev.wakeTime.clone().set('hour', nxtHour),
    }));
  };

  const onSelectMinute = (minute: string) => {
    const minuteNumber = parseInt(minute);
    setProfile((prev) => ({
      ...prev,
      wakeTime: prev.wakeTime.clone().set('minute', minuteNumber),
    }));
  };

  const onSelectMeridiem = (day: string) => {
    const hourNumber = wakeTime.hour();
    const isAfternoon = day === 'PM';
    const nxtHour = isAfternoon ? (hourNumber % 12) + 12 : hourNumber % 12;

    setProfile((prev) => ({
      ...prev,
      wakeTime: prev.wakeTime.clone().set('hour', nxtHour),
    }));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <TitleLayout title="회원정보">
      <Container>
        <Input
          label={'이름'}
          disabled={mode === 'VIEW'}
          value={memberName}
          onChange={onChangeMemberName}
        />
        <Input
          label={'쿠키 이름'}
          disabled={mode === 'VIEW'}
          value={cookieName}
          onChange={onChangeCookieName}
        />
        <Input label={'기상 시간'} disabled={mode === 'VIEW'} value={wakeTime.format('hh:mm A')} />
        {mode === 'EDIT' && (
          <TimePicker
            time={wakeTime}
            onSelectHour={onSelectHour}
            onSelectMinute={onSelectMinute}
            onSelectMeridiem={onSelectMeridiem}
          />
        )}
        <Button onClick={onClickMainButton}>수정하기</Button>
      </Container>
    </TitleLayout>
  );
}

const Container = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export default Profile;
