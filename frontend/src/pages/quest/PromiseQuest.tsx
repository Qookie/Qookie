import React from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import { showToast } from '../../components/shared/molecules/Alert';
import { http } from '../../api/instance';
import CoffeeImage from '../../assets/pngs/coffee.png';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';
import { QuestResponse } from '../../components/quest/types';

function PromiseQuest() {
  const onSuccessQuest = async () => {
    try {
      const response = await http.post<QuestResponse>('/api/quest/promise');
      showToast({ title: '10 포인트 적립🌟', content: '약속 퀘스트가 달성되었습니다.' });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestLayout
      quest={Quest.PROMISE}
      title="약속"
      desc={
        '친구와 가족들과 함께 약속을 잡아보는 건 어떨까요?\n함께 더 특별한 순간을 만들 수 있을 거에요.'
      }
      completeButtonText="약속 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    >
      <img
        src={CoffeeImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </QuestLayout>
  );
}

export default PromiseQuest;
