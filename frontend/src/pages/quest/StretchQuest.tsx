import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';
import VideoQuestLayout from '../../components/quest/templates/VideoQuestLayout';
import { QuestResponse } from '../../components/quest/types';

function StretchQuest() {
  const onSuccessQuest = async () => {
    try {
      const response = await http.post<QuestResponse>('/api/quest/stretch');
      showToast({ title: '10 포인트 적립🌟', content: '스트레칭 퀘스트가 달성되었습니다.' });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const stretchVideo = 'https://youtu.be/pzS-0oAYmr4?si=Or1NlUOQze0fSDCb';

  return (
    <VideoQuestLayout
      quest={Quest.STRETCH}
      title={'스트레칭'}
      desc={'스트레칭으로 뭉친 몸을 풀어보아요!\n영상을 끝까지 시청하면 퀘스트 버튼이 활성화됩니다.'}
      completeButtonText="스트레칭 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
      video={stretchVideo}
    />
  );
}

export default StretchQuest;
