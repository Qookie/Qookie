import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '.';

const meta: Meta<typeof Cart> = {
  component: Cart,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'Cart',
};

export default meta;
type Story = StoryObj<typeof Cart>;

export const Default: Story = {};
