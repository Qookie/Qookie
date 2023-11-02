import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import MypageList from '.';

const meta: Meta<typeof MypageList> = {
  component: MypageList,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'MypageList',
};

export default meta;
type Story = StoryObj<typeof MypageList>;

export const Default: Story = {
  name: 'list',
};
