import { StoryObj, Meta } from '@storybook/react';
import Qookie from '.';

const meta: Meta<typeof Qookie> = {
  component: Qookie,
  title: 'Qookie',
};

export default meta;
type Story = StoryObj<typeof Qookie>;

export const Default: Story = {};
