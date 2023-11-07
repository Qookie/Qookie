import ClockImage from '../../assets/pngs/Clock.png';
import { http } from '../../api/instance';
import styled from 'styled-components';
import QuestLayout from '../../components/quest/templates/QuestLayout';
import { Quest } from '../../types/quest';
import RewardText from '../../components/quest/molecules/RewardText';
import { showToast } from '../../components/shared/molecules/Alert';

function WakeupQuest() {
  const onSuccessQuest = async () => {
    try {
      await http.post('/api/quest/wake');
      showToast({ title: '10 포인트 적립🌟', content: '기상 퀘스트가 달성되었습니다.' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestLayout
      quest={Quest.WAKE}
      title={'기상 체크'}
      desc={
        '규칙적으로 일어나서 기분 좋은 하루를 시작해보세요!\n건강한 하루는 규칙적인 기상에서 시작됩니다.'
      }
      completeButtonText="기상 완료"
      onSuccessQuest={onSuccessQuest}
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    >
      <img
        src={ClockImage}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
    </QuestLayout>
  );
}

const MessageTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--MR_WHITE);
  margin: 5px 0px;
`;

const MessageContent = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--MR_GRAY1);
  margin: 5px 0px;
`;

export default WakeupQuest;
