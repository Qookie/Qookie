import React from 'react';
import ImageQuestLayout from '../../components/quest/templates/ImageQuestLayout';
import { Quest } from '../../types/quest';
import BowlImage from '../../assets/pngs/Bowl.png';
import { http } from '../../api/instance';
import styled from 'styled-components';
import RewardText from '../../components/quest/molecules/RewardText';
import { showToast } from '../../components/shared/molecules/Alert';
import { QuestResponse } from '../../components/quest/types';

function EatQuest() {
  const onSuccessQuest = async (img?: FormData) => {
    if (!img) {
      return;
    }

    try {
      const response = await http.post<QuestResponse>('/api/quest/photo/eat', img, true);
      showToast({ title: '10 포인트 적립🌟', content: '식사 퀘스트가 달성되었습니다.' });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ImageQuestLayout
      quest={Quest.EAT}
      title="식사"
      defaultImage={BowlImage}
      onSuccessQuest={onSuccessQuest}
      desc={'규칙적인 식사로 에너지를 충전해보세요!\n건강한 몸은 규칙적인 식사에서 시작됩니다.'}
      completeButtonText="식사 완료"
      questSubText={{
        DEFAULT: '아래 버튼을 클릭하면 퀘스트가 완료됩니다.',
        SUCCESS: <RewardText />,
      }}
    />
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

export default EatQuest;
