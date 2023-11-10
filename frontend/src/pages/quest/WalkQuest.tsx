import React from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import TreeImage from '../../assets/pngs/tree.png';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';

function WalkQuest() {
  const onSuccessQuest = async () => {
    try {
      await http.post('/api/quest/walk');
      showToast({ title: '10 포인트 적립🌟', content: '산책 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };

  const watchSuccessCallback = (data: GeolocationPosition) => {
    console.log('success', data);
    console.log(data.timestamp);
    console.log(data.coords);
    const body = {
      timestamp: data.timestamp,
      accuracy: data.coords.accuracy,
      lat: data.coords.latitude,
      lon: data.coords.longitude,
    };
    http.post2a('api/geo/test', body);
    showToast({
      title: data.timestamp,
      content: `ACC: ${data.coords.accuracy}\nLAT: ${data.coords.latitude} / LON: ${data.coords.longitude}`,
    });
  };

  const watchFailureCallback = (data: GeolocationPositionError) => {
    console.log('err', data);
    console.log(data.message);
  };

  const options = {
    maximumAge: 5000,
    enableHighAccuracy: true,
  };

  const startWalking = () => {
    if ('geolocation' in navigator) {
      console.log('START');
      navigator.geolocation.watchPosition(watchSuccessCallback, watchFailureCallback, options);
    }
  };
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
    </QuestLayout>
  );
}

export default WalkQuest;
