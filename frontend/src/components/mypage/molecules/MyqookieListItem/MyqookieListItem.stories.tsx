import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import MyqookieListItem from '.';

const meta: Meta<typeof MyqookieListItem> = {
  component: MyqookieListItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'MyqookieListItem',
};

export default meta;
type Story = StoryObj<typeof MyqookieListItem>;

export const Default: Story = {
  name: 'my qookie',
  args: {
    name: 'first',
    image:
      'https://bangle.s3.ap-northeast-2.amazonaws.com/0b160780-1a7b-4db7-ab5d-9ea0c619ca4b.png',
    startedAt: '2023-10-27T16:22:21.477816',
    endedAt: '2023-10-27T16:23:12.656055',
    age: 1,
  },
};
