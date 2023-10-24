import type { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '라벨',
    placeholder: '이름을 지어주세요',
  },
};

export const Disabled: Story = {
  args: {
    label: '라벨',
    placeholder: '이름을 지어주세요',
    disabled: true,
    value: '김쿠키',
  },
};
