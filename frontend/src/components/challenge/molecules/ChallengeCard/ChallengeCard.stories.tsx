import type { Meta, StoryObj } from '@storybook/react';
import ChallengeCard from '.';

const meta: Meta<typeof ChallengeCard> = {
  component: ChallengeCard,
  title: 'ChallengeCard',
};

export default meta;
type Story = StoryObj<typeof ChallengeCard>;

export const Default: Story = {
  render: (args) => <ChallengeCard title="15일 기상 챌린지" condition="15일 / 15일" coin={100} />,
};
