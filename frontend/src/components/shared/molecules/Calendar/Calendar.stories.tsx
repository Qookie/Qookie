import type { Meta, StoryObj } from '@storybook/react';
import Calendar from '.';
import moment from 'moment';
import AttendanceImage from '../../../../assets/svgs/attendance.svg';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Calendar',
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    month: moment(),
  },
};

export const Attendance: Story = {
  args: {
    month: moment(),
    dateBackground: {
      1: `background: url(${AttendanceImage}) center no-repeat`,
      4: `background: url(${AttendanceImage}) center no-repeat`,
    },
  },
};

export const QuestHistory: Story = {
  args: {
    month: moment(),
    dateBackground: {
      2: `background-color: #FFDF8E; border-radius: 18px; border: 2px solid var(--MR_GRAY2)`,
      10: `background-color: var(--MR_YELLOW); border-radius: 18px;`,
      21: `background-color: #FFF2D0; border-radius: 18px;`,
    },
  },
};
