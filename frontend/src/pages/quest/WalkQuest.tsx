import React, { useEffect, useState } from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import TreeImage from '../../assets/pngs/tree.png';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';
import { QuestResponse } from '../../components/quest/types';
import ProgressBar from '../../components/shared/atoms/ProgressBar';

type DistanceResponse = {
  msg: string;
  payload: {
    distance: number;
  };
};

type CheckResponse = {
  msg: string;
  payload: {
    started: boolean;
  };
};

function WalkQuest() {
  const [distance, setDistance] = useState<number>(0);
  const [walking, setWalking] = useState<boolean>(false);

  const checkIfWalking = async () => {
    return (await http.get<CheckResponse>('api/geo/check')).payload.started;
  };

  const onSuccessQuest = async () => {
    try {
      const response = await http.post<QuestResponse>('/api/quest/walk');
      showToast({ title: '10 포인트 적립🌟', content: '산책 퀘스트가 달성되었습니다.' });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const sendLocation = async () => {
    return await navigator.geolocation.getCurrentPosition(
      async (data: GeolocationPosition) => {
        const body = {
          lat: data.coords.latitude,
          lon: data.coords.longitude,
        };
        const dist = (await http.post<DistanceResponse>('api/geo', body)).payload.distance;
        setDistance(dist);
        if (dist > 500) {
          onSuccessQuest();
          setWalking(false);
        }
        return dist;
      },
      null,
      {
        enableHighAccuracy: true,
      },
    );
  };

  useEffect(() => {
    checkIfWalking().then((started) => setWalking(started));
  }, [distance]);

  useEffect(() => {
    if (walking && 'geolocation' in navigator) {
      sendLocation();
    }
  }, [walking]);

  return (
    <QuestLayout
      quest={Quest.WALK}
      title={'산책'}
      desc={'건강한 하루는 규칙적인 산책에서 시작됩니다.\n산책하고 기분좋게 하루를 시작해보세요!'}
      completeButtonText="산책 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
        DISABLED: `아직 ${0}m남았어요!`,
      }}
    >
      <img
        src={TreeImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
      {walking ? <ProgressBar total={500} now={distance} /> : <></>}
    </QuestLayout>
  );
}

export default WalkQuest;
