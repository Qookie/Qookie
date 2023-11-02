import React, { Suspense, useEffect, useState } from 'react';
import TitleLayout from '../../../shared/Template/TitleLayout';
import Button from '../../../shared/atoms/Button';
import styled from 'styled-components';
import Toast from '../../../shared/molecules/Alert';

export type QuestStatus = 'DEFAULT' | 'COMPLETE' | 'SUCCESS';

interface Props {
  questStatus: QuestStatus;
  title: React.ReactNode;
  desc: React.ReactNode;
  completeButtonText: string;
  completeQuest: () => void;
  setQuestStatus: (status: QuestStatus) => void;
  Subcomponent?: React.ReactNode;
  children?: React.ReactNode;
}

const ButtomThemeMap: {
  [key in QuestStatus]: 'default' | 'finished' | 'disabled';
} = {
  DEFAULT: 'default',
  SUCCESS: 'finished',
  COMPLETE: 'disabled',
};

function QuestLayout({
  title,
  desc,
  children,
  completeButtonText,
  Subcomponent,
  completeQuest,
  setQuestStatus,
  questStatus,
}: Props) {
  const onClickComplete = async () => {
    await completeQuest();
    setQuestStatus('SUCCESS');
  };

  return (
    <TitleLayout title={title} desc={desc}>
      {children}
      <ButtonConatainer>
        {Subcomponent}
        <Button theme={ButtomThemeMap[questStatus]} onClick={onClickComplete}>
          {completeButtonText}
        </Button>
      </ButtonConatainer>
      <Toast />
    </TitleLayout>
  );
}

const ButtonConatainer = styled.div`
  padding: 1rem;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default QuestLayout;
