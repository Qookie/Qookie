import React from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import HeartImage from '../../assets/pngs/heart.png';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';

function MeditaionQuest() {
  const onSuccessQuest = async () => {
    try {
      await http.post('/api/quest/meditation');
      showToast({ title: '10 포인트 적립🌟', content: '명상 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestLayout
      quest={Quest.MEDITATION}
      title={'명상'}
      desc={'눈을 감고, 호흡에 집중해보세요.\n마음이 편안해지고, 긍정적인 에너지가 샘솟을 거에요.'}
      completeButtonText="명상 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    >
      <img
        src={HeartImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </QuestLayout>
  );
}

export default MeditaionQuest;
