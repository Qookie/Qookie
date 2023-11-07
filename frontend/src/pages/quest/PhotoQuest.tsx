import React from 'react';
import ImageQuestLayout from '../../components/quest/templates/ImageQuestLayout';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import CameraImage from '../../assets/pngs/camera.png';
import RewardText from '../../components/quest/molecules/RewardText';

function PhotoQuest() {
  const onSuccessQuest = async (img?: FormData) => {
    if (!img) {
      return;
    }

    try {
      await http.post('/api/quest/photo/photo', img, true);
      showToast({ title: '10 포인트 적립🌟', content: '사진 찍기 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageQuestLayout
      quest={Quest.PHOTO}
      title="사진 찍기"
      defaultImage={CameraImage}
      onSuccessQuest={onSuccessQuest}
      desc={'바쁜 일상에서 잠시 벗어나 하늘을 보며 여유로움을 즐겨보는건 어떨까요?'}
      completeButtonText="사진 찍기 완료"
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    />
  );
}

export default PhotoQuest;
