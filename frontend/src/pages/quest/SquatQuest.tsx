import React from 'react';
import kettlebelImage from '../../assets/pngs/kettlebel.png';
import { Quest } from '../../types/quest';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import RewardText from '../../components/quest/molecules/RewardText';
import { QuestResponse } from '../../components/quest/types';

function SquatQuest() {
  const onSuccessQuest = async () => {
    try {
      const response = await http.post<QuestResponse>('/api/quest/squat');
      showToast({ title: '10 포인트 적립🌟', content: '스쿼트 퀘스트가 달성되었습니다.' });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestLayout
      quest={Quest.SQUAT}
      title="스쿼트"
      desc={
        '하루에 한 번 스쿼트를 실천하여 건강한 생활습관을 길러봐요.\n꾸준히 스쿼트를 하면, 건강과 체력에 큰 도움이 될 거예요!'
      }
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
