import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '.';

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'NavBar',
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {};
