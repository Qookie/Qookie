import type { Meta, StoryObj } from '@storybook/react';
import TimePicker from '.';
import moment from 'moment';

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  title: 'TimePicker',
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
  },
  render: (args) => <TimePicker {...args} />,
};
