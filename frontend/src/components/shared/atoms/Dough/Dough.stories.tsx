import { StoryObj, Meta } from '@storybook/react';
import Dough from '.';

const meta: Meta<typeof Dough> = {
  component: Dough,
  title: 'Dough',
};

export default meta;
type Story = StoryObj<typeof Dough>;

export const Default: Story = {};
