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
    type: 'default',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};

export const Finished: Story = {
  args: {
    type: 'finished',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};

export const Disabled: Story = {
  args: {
    type: 'disabled',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};

export const Transparent: Story = {
  args: {
    type: 'transparent',
  },

  render: (args) => <Button {...args}>기상 완료</Button>,
};
