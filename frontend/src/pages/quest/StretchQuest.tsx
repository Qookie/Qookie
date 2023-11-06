import React from 'react';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import MatImage from '../../assets/pngs/mat.png';
import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';

function StretchQuest() {
  const onSuccessQuest = async () => {
    try {
      await http.post('/api/quest/stretch');
      showToast({ title: '10 포인트 적립🌟', content: '스트레칭 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <QuestLayout
      quest={Quest.STRETCH}
      title={'스트레칭'}
      desc={
        '규칙적으로 일어나서 기분 좋은 하루를 시작해보세요!\n건강한 하루는 규칙적인 기상에서 시작됩니다.'
      }
      completeButtonText="스트레칭 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    >
      <img
        src={MatImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </QuestLayout>
  );
}

export default StretchQuest;
