import type { Meta, StoryObj } from '@storybook/react';
import RewardData from '.';

const meta: Meta<typeof RewardData> = {
  component: RewardData,
  title: 'RewardData',
};

export default meta;
type Story = StoryObj<typeof RewardData>;

export const Qoin: Story = {
  args: {
    date: '10.12',
    title: '기상 퀘스트 달성 보상',
    qoin: 10,
  },
  render: (args) => <RewardData {...args} />,
};


