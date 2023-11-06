import React from 'react';
import kettlebelImage from '../../assets/pngs/kettlebel.png';
import { Quest } from '../../types/quest';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import RewardText from '../../components/quest/molecules/RewardText';

function SquatQuest() {
  const onSuccessQuest = async () => {
    try {
      await http.post('/api/quest/squat');
      showToast({ title: '10 포인트 적립🌟', content: '스쿼트 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestLayout
      quest={Quest.SQUAT}
      title="스쿼트"
      desc={'test'}
      completeButtonText="스쿼트 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    >
      <img
        src={kettlebelImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </QuestLayout>
  );
}

export default SquatQuest;
