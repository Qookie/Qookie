import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '.';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    date: { year: '2023', month: '10' },
  },
  render: (args) => <DatePicker {...args} />,
};
