import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '.';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'ProgressBar',
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    total: 100,
    now: 30,
  },
};
