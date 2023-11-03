import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import MypageListItem from '.';

const meta: Meta<typeof MypageListItem> = {
  component: MypageListItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'MypageListItem',
};

export default meta;
type Story = StoryObj<typeof MypageListItem>;

export const Default: Story = {
  name: 'item',
  args: {
    mypage: 'deco',
  },
};
