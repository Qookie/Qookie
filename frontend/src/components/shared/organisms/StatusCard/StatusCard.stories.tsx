import { StoryObj, Meta } from '@storybook/react';
import StatusCard from '.';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof StatusCard> = {
  component: StatusCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'StatusCard',
};

export default meta;
type Story = StoryObj<typeof StatusCard>;

export const Default: Story = {};
