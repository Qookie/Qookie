import type { Meta, StoryObj } from '@storybook/react';
import TimePicker from '.';

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  title: 'TimePicker',
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    time: {
      hour: '12',
      minute: '34',
      meridiem: 'PM',
    },
  },

  render: (args) => <TimePicker {...args} />,
};
