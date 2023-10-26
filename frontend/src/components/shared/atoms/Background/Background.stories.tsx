import { StoryObj, Meta } from '@storybook/react';
import Background from '.';

const meta: Meta<typeof Background> = {
  component: Background,
  title: 'Background',
};

export default meta;
type Story = StoryObj<typeof Background>;

export const Default: Story = {};
