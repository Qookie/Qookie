import type { Meta, StoryObj } from '@storybook/react';
import Chip from '.';

const meta: Meta<typeof Chip> = {
  component: Chip,
  title: 'Chip',
  render: (args) => <Chip {...args} />,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    type: 'category',
    icon: '🍅',
    text: '500',
    isClicked: true,
  },
};