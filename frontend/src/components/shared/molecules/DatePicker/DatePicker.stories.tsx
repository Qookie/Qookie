import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '.';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => <DatePicker {...args} />,
};
