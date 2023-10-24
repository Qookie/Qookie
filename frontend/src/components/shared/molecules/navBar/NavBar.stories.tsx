import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '.';

export default {
  component: NavBar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta<typeof NavBar>;

type Story = StoryObj<typeof NavBar>;

const Template: Story = {
  name: 'Default',
  render: () => <NavBar />,
};

export const Default: Story = {
  ...Template,
  name: 'Default',
};