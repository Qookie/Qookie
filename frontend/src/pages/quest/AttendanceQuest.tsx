import React, { useEffect, useState } from 'react';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import CalendarImage from '../../assets/pngs/calendar_big.png';
import moment from 'moment';
import QuestInnerLayout from '../../components/quest/templates/QuestInnerLayout';
import { QuestStatus, QuestSubText } from '../../components/quest/types';
import Text from '../../components/shared/atoms/Text';
import Calendar from '../../components/shared/molecules/Calendar';
import AttendanceImage from '../../assets/svgs/attendance.svg';
import styled from 'styled-components';

interface AttendanceResponse {
  msg: string;
  payload: {
    todayComplete: boolean;
    attendanceDays: number[];
  };
}

type DateStyle = Record<string, string>;

const attendanceStyle = `background: url(${AttendanceImage}) center no-repeat`;

function AttendanceQuest() {
  const cur = moment();
  const year = cur.get('y');
  const month = String(cur.month() + 1).padStart(2, '0');

  const [status, setStatus] = useState<QuestStatus>('DEFAULT');
  const [attendace, setAttendance] = useState<number[]>([]);

  const onSuccessQuest = async () => {
    try {
      await http.post('/api/quest/attendance');
      showToast({ title: '10 포인트 적립🌟', content: '출석 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };

  const subComponentText: QuestSubText = {
    DEFAULT: '아래 버튼을 클릭하면 출석이 완료됩니다.',
    SUCCESS: '내일 또 만나요~',
  };

  const fetchAttendance = async () => {
    const {
      payload: { todayComplete, attendanceDays },
    } = await http.get<AttendanceResponse>(`/api/quest/calendar/attendance/${year}/${month}`);

    if (todayComplete) {
      setStatus('SUCCESS');
    }

    setAttendance(attendanceDays ?? []);
  };

  const attendaneStyleMap = attendace.reduce<DateStyle>((acc, cur) => {
    acc[`${cur}`] = attendanceStyle;
    return acc;
  }, {});

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div>
      <QuestInnerLayout
        questStatus={status}
        setQuestStatus={setStatus}
        title="출석 체크 👑"
        desc="출석 체크 누르고 오늘의 보상을 받아보세요."
        completeButtonText="출석"
        onSuccessQuest={onSuccessQuest}
        Subcomponent={<Text color="var(--MR_GRAY2)">{subComponentText[status]}</Text>}
      >
        <img
          src={CalendarImage}
          style={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      </QuestInnerLayout>
      <CalendarContainer>
        <Text typography="title" style={{ marginBottom: '2rem' }}>
          {month}월
        </Text>
        <Calendar month={cur} dateBackground={attendaneStyleMap} />
      </CalendarContainer>
    </div>
  );
}

const CalendarContainer = styled.div`
  margin: 3.75rem 1rem 0 1rem;
`;

export default AttendanceQuest;
