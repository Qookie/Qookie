import { Quest } from '../../../types/quest';

export type QuestStatus = 'DEFAULT' | 'SUCCESS' | 'DISABLED';

export interface CommonQuestLayoutProps {
  title: React.ReactNode;
  desc: React.ReactNode;
  completeButtonText: string;
  onSuccessQuest: (img?: FormData) => void;
  children?: React.ReactNode;
}

export interface QuestWrapperLayoutProps extends CommonQuestLayoutProps {
  quest: Quest;
  questSubText: QuestSubText;
}

export type QuestSubText = {
  [key in QuestStatus]?: React.ReactNode;
};

export type QuestStatusResponse = {
  message: string;
  payload: {
    complete: boolean;
    image: string | null;
  };
};
