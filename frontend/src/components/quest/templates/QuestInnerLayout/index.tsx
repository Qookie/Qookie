import React, { Suspense, useEffect, useState } from 'react';
import TitleLayout from '../../../shared/Template/TitleLayout';
import Button from '../../../shared/atoms/Button';
import styled from 'styled-components';
import { CommonQuestLayoutProps, QuestStatus } from '../../types';

export interface Props extends CommonQuestLayoutProps {
  questStatus: QuestStatus;
  setQuestStatus: (status: QuestStatus) => void;
  Subcomponent?: React.ReactNode;
}

const ButtomThemeMap: {
  [key in QuestStatus]: 'default' | 'finished' | 'disabled';
} = {
  DEFAULT: 'default',
  SUCCESS: 'finished',
  DISABLED: 'disabled',
};

function QuestInnerLayout({
  title,
  desc,
  children,
  completeButtonText,
  Subcomponent,
  onSuccessQuest,
  setQuestStatus,
  questStatus,
}: Props) {
  const onClickComplete = async () => {
    if (questStatus !== 'DEFAULT') {
      return;
    }

    const response = await onSuccessQuest();

    if (response?.payload === false) {
      return;
    }
    setQuestStatus('SUCCESS');
  };

  const questButtonText: {
    [key in QuestStatus]: string;
  } = {
    DEFAULT: completeButtonText,
    DISABLED: completeButtonText,
    SUCCESS: '성공',
  };

  return (
    <TitleLayout title={title} desc={desc}>
      {children}
      <ButtonConatainer>
        {Subcomponent}
        <Button theme={ButtomThemeMap[questStatus]} onClick={onClickComplete}>
          {questButtonText[questStatus]}
        </Button>
      </ButtonConatainer>
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

export default QuestInnerLayout;
