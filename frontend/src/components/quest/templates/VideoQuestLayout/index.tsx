import React, { useEffect, useState } from 'react';
import QuestInnerLayout from '../QuestInnerLayout';
import { QuestStatus, QuestStatusResponse, QuestWrapperLayoutProps } from '../../types';
import Text from '../../../shared/atoms/Text';
import { http } from '../../../../api/instance';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

interface Props extends QuestWrapperLayoutProps {
  video: string;
}

function VideoQuestLayout({ video, questSubText, quest, ...props }: Props) {
  const [questStatus, setQuestStatus] = useState<QuestStatus>('DISABLED');
  const fetchQuestStatus = async () => {
    const {
      payload: { complete },
    } = await http.get<QuestStatusResponse>(`/api/quest/${quest}`);

    if (complete) {
      setQuestStatus('SUCCESS');
    }
  };

  const onEndVideo = () => {
    if (questStatus === 'DISABLED') {
      setQuestStatus('DEFAULT');
    }
  };

  useEffect(() => {
    fetchQuestStatus();
  }, []);

  return (
    <QuestInnerLayout
      {...props}
      questStatus={questStatus}
      setQuestStatus={setQuestStatus}
      Subcomponent={<Text color="var(--MR_GRAY2)">{questSubText[questStatus]}</Text>}
    >
      <Container>
        <ReactPlayer url={video} onEnded={onEndVideo} width="100%" />
      </Container>
    </QuestInnerLayout>
  );
}

const Container = styled.div`
  padding: 0 1rem;
`;

export default VideoQuestLayout;
