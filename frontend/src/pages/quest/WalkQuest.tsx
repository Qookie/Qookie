import React from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import TreeImage from '../../assets/pngs/tree.png';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';
import { QuestResponse } from '../../components/quest/types';

function WalkQuest() {
  const onSuccessQuest = async () => {
    try {
      const response = await http.post<QuestResponse>('/api/quest/walk');
      showToast({ title: '10 포인트 적립🌟', content: '산책 퀘스트가 달성되었습니다.' });

      return response;
    } catch (error) {
      console.log(error);
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
    </QuestLayout>
  );
}

export default WalkQuest;
