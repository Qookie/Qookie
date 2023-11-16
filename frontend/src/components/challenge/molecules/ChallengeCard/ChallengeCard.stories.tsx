import type { Meta, StoryObj } from '@storybook/react';
import ChallengeCard from '.';

const meta: Meta<typeof ChallengeCard> = {
  component: ChallengeCard,
  title: 'ChallengeCard',
};

export default meta;
type Story = StoryObj<typeof ChallengeCard>;

export const Default: Story = {
  args: {
    challengeName: '15일 기상 챌린지',
    coin: 100,
    curCnt: 15,
    totalCnt: 15,
    questName: 'WAKE',
    status: 'incomplete',
    badgeId: 0,
  },
  render: (args) => <ChallengeCard {...args} />,
};
