import React, { useEffect, useState } from 'react';
import QuestInnerLayout from '../QuestInnerLayout';
import { QuestStatus, QuestStatusResponse, QuestWrapperLayoutProps } from '../../types';
import Text from '../../../shared/atoms/Text';
import { http } from '../../../../api/instance';

function QuestLayout({ children, quest, questSubText, ...props }: QuestWrapperLayoutProps) {
  const [questStatus, setQuestStatus] = useState<QuestStatus>('DEFAULT');

  const fetchQuestStatus = async () => {
    const {
      payload: { complete },
    } = await http.get<QuestStatusResponse>(`/api/quest/${quest}`);

    if (complete) {
      setQuestStatus('SUCCESS');
    }
  };

  useEffect(() => {
    fetchQuestStatus();
  }, []);
  return (
    <QuestInnerLayout
      {...props}
      Subcomponent={<Text color="var(--MR_GRAY2)">{questSubText[questStatus]}</Text>}
      questStatus={questStatus}
      setQuestStatus={setQuestStatus}
    >
      {children}
    </QuestInnerLayout>
  );
}
export default QuestLayout;
