import { StoryObj, Meta } from '@storybook/react';
import Level from '.';

const meta: Meta<typeof Level> = {
  component: Level,
  title: 'Level',
};

export default meta;
type Story = StoryObj<typeof Level>;

export const Default: Story = {
  args: {
    level: 1,
  },
};
