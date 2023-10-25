import { StoryObj, Meta } from '@storybook/react';
import StatusCard from '.';

const meta: Meta<typeof StatusCard> = {
  component: StatusCard,
  title: 'StatusCard',
};

export default meta;
type Story = StoryObj<typeof StatusCard>;

export const Default: Story = {};
