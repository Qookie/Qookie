import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from '.';
import DatePicker from '../DatePicker';

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  title: 'BottomSheet',
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

const onClose = () => {
  const isBottomSheetOpen = false;
};

export const Default: Story = {
  render: (args) => (
    <BottomSheet isOpen={true} onClose={onClose} children={<DatePicker year={2023} month={11} />} title={'조회'} />
  ),
};
