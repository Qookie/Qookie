import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    theme: 'default',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};

export const Finished: Story = {
  args: {
    theme: 'finished',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};

export const Disabled: Story = {
  args: {
    theme: 'disabled',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};

export const Transparent: Story = {
  args: {
    theme: 'transparent',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};
