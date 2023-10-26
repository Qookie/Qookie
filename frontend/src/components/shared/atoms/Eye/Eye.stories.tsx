import { StoryObj, Meta } from '@storybook/react';
import Eye from '.';

const meta: Meta<typeof Eye> = {
  component: Eye,
  title: 'Eye',
};

export default meta;
type Story = StoryObj<typeof Eye>;

export const Default: Story = {};
