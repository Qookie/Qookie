import { http } from '../../api/instance';
import { showToast } from '../../components/shared/molecules/Alert';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';
import { QuestResponse } from '../../components/quest/types';
import VideoQuestLayout from '../../components/quest/templates/VideoQuestLayout';

function MeditaionQuest() {
  const onSuccessQuest = async () => {
    try {
      const response = await http.post<QuestResponse>('/api/quest/meditation');
      showToast({ title: '10 포인트 적립🌟', content: '명상 퀘스트가 달성되었습니다.' });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const meditationVideo = 'https://www.youtube.com/watch?v=CptcSAlN8ug';

  return (
    <VideoQuestLayout
      quest={Quest.MEDITATION}
      title={'명상'}
      desc={'눈을 감고, 호흡에 집중해보세요.\n마음이 편안해지고, 긍정적인 에너지가 샘솟을 거에요.\n영상을 끝까지 시청하면 퀘스트 버튼이 활성화됩니다.'}
      completeButtonText="명상 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
      video={meditationVideo}
    />
  );
}

export default MeditaionQuest;
