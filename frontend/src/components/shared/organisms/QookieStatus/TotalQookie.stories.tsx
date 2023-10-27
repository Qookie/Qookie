import { StoryObj, Meta } from '@storybook/react';
import QookieStatus from '.';

const meta: Meta<typeof QookieStatus> = {
  component: QookieStatus,
  title: 'QookieStatus',
};

export default meta;
type Story = StoryObj<typeof QookieStatus>;

export const Default: Story = {};
