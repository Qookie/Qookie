import React from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import { Quest } from '../../types/quest';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import RewardText from '../../components/quest/molecules/RewardText';
import CupImage from '../../assets/pngs/cup.png';
import { QuestResponse } from '../../components/quest/types';

function WaterQuest() {
  const onSuccessQuest = async () => {
    try {
      const response = await http.post<QuestResponse>('/api/quest/water');
      showToast({ title: '10 포인트 적립🌟', content: '물 마시기 퀘스트가 달성되었습니다.' });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestLayout
      quest={Quest.WATER}
      title={'물 마시기'}
      desc={
        '물은 우리 몸의 필수 구성 요소에요.\n매일 물 한잔을 마시며, 건강을 지키는 첫 걸음을 내딛어보세요.'
      }
      completeButtonText="물 마시기 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    >
      <img
        src={CupImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </QuestLayout>
  );
}

export default WaterQuest;
