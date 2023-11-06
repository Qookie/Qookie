import { StoryObj, Meta } from '@storybook/react';
import QookieStatus from '.';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof QookieStatus> = {
  component: QookieStatus,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'QookieStatus',
};

export default meta;
type Story = StoryObj<typeof QookieStatus>;

export const Default: Story = {};
