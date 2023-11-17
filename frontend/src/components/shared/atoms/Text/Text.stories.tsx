import type { Meta, StoryObj } from '@storybook/react';
import Text from '.';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Text',
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Title: Story = {
  args: {
    typography: 'title',
  },

  render: (args) => <Text {...args}>반죽을 꾸며주세요</Text>,
};

export const Main: Story = {
  args: {
    typography: 'main',
    color: 'var(--MR_GRAY2)',
  },

  render: (args) => <Text {...args}>구레잇한 당신의 삶을 위해 Qookie를 시작해보세요</Text>,
};

export const Button: Story = {
  args: {
    typography: 'button',
  },

  render: (args) => <Text {...args}>버튼</Text>,
};
