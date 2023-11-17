import type { Meta, StoryObj } from '@storybook/react';
import Toast from '.';
import 'react-toastify/dist/ReactToastify.css';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Toast',
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: (args) => <Toast />,
};
