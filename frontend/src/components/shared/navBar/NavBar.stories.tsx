import { StoryObj, Meta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import NavBar from '.';

export default {
  component: NavBar,
} as Meta<typeof NavBar>;

type Story = StoryObj<typeof NavBar>;

const Template: Story = {
  name: 'Default',
  render: () => <NavBar />,
  decorators: [withRouter],
};

export const Default: Story = {
  ...Template,
  name: 'Default',
};