import type { Meta, StoryObj } from '@storybook/react';
import Money from '.';

const meta: Meta<typeof Money> = {
  component: Money,
  title: 'Money',
};

export default meta;
type Story = StoryObj<typeof Money>;

export const Default: Story = {
  args: {
    MoneyTheme: 'default',
  },
  render: (args) => <Money {...args} />,
};