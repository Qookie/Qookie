import { StoryObj, Meta } from '@storybook/react';
import CartItem from '.';

const meta: Meta<typeof CartItem> = {
  component: CartItem,
  title: 'CartItem',
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {};
