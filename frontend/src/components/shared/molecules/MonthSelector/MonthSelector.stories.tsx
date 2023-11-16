import type { Meta, StoryObj } from '@storybook/react';
import MonthSelector from '.';

const meta: Meta<typeof MonthSelector> = {
  component: MonthSelector,
  title: 'MonthSelector',
};

export default meta;
type Story = StoryObj<typeof MonthSelector>;

export const Default: Story = {
  render: (args) => <MonthSelector onClickNextMonth={() => 12} onClickPrevMonth={() => 10} selectedMonth={11} />,
};
