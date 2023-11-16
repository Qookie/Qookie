import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Item, { ItemPageProps } from '.';

const meta: Meta<typeof Item> = {
  component: Item,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'Item',
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  name: 'item',
  args: {
    item: {
      id: 0,
      media:
        'https://cdn3.vectorstock.com/i/1000x1000/10/22/seamless-triangular-patter-vector-21431022.jpg',
    },
    isCheck: false,
  },
};
