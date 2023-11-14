import React, { useEffect, useState } from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import TreeImage from '../../assets/pngs/tree.png';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';
import ProgressBar from '../../components/shared/atoms/ProgressBar';

type DistanceResponse = {
  msg: string;
  payload: {
    distance: number;
  };
};

function WalkQuest() {
  const [distance, setDistance] = useState<number>(0);
  const [test, setTest] = useState<GeolocationPosition>();
  const [walking, setWalking] = useState<boolean>(false);

  const onSuccessQuest = async () => {
    try {
      await http.post('/api/quest/walk');
      showToast({ title: '10 포인트 적립🌟', content: '산책 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };

  const getGeoLocationPer = () => {
    navigator.geolocation.getCurrentPosition(
      (data: GeolocationPosition) => {
        const body = {
          acc: data.coords.accuracy,
          lat: data.coords.latitude,
          lon: data.coords.longitude,
          heading: data.coords.heading,
          spd: data.coords.speed,
        };
        http
          .post<DistanceResponse>('api/geo/test', body)
          .then((res) => {
            // TODO: delete this
            showToast({
              title: data.timestamp,
              content: `DIS: ${res.payload.distance}\nLAT: ${data.coords.latitude} / LON: ${data.coords.longitude}`,
            });
            setTest(data);
            setDistance(res.payload.distance);
            return res.payload.distance;
          })
          .then((dis) => {
            if (dis > 5000) {
              onSuccessQuest();
              setWalking(false);
            } else {
              setTimeout(getGeoLocationPer, 1000);
            }
          });
      },
      null,
      {
        maximumAge: 1000,
        enableHighAccuracy: true,
      },
    );
  };

  const startWalking = () => {
    if ('geolocation' in navigator && !walking) {
      setWalking(true);
      getGeoLocationPer();
    }
  };

  // TODO: add distance bar and useEffect to render
  useEffect(() => {}, [distance, test]);

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
      }}
    >
      <img
        src={TreeImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
      <button type="button" onClick={startWalking}>
        START WALKING
      </button>
      <div>
        {'TIMESTAMP: ' + test?.timestamp}
        <br />
        {'ACC: ' + test?.coords.accuracy}
        <br />
        {'DIS: ' + distance}
        <br />
        {'ALT: ' + test?.coords.altitude}
        <br />
        {'ALT_ACC: ' + test?.coords.altitudeAccuracy}
        <br />
        {'HEADING: ' + test?.coords.heading}
        <br />
        {'LAT: ' + test?.coords.latitude}
        <br />
        {'LON: ' + test?.coords.longitude}
        <br />
        {'SPD: ' + test?.coords.speed}
      </div>
      <ProgressBar total={50} now={distance} />
    </QuestLayout>
  );
}

export default WalkQuest;
