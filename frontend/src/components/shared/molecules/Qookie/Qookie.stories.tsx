import { StoryObj, Meta } from '@storybook/react';
import Qookie from '.';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Qookie> = {
  component: Qookie,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'Qookie',
};

export default meta;
type Story = StoryObj<typeof Qookie>;

export const Default: Story = {};
