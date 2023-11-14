import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '.';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'TextArea',
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: '오늘 기분 어떠신지?'
  },
  render: (args) => <TextArea {...args}/>,
};
