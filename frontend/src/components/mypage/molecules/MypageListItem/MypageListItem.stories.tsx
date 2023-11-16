import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import MypageListItem, { MypageItemProps } from '.';
import { Deco } from '../../../../assets/svgs';

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

export const Default: Story = (args: MypageItemProps) => ({
  props: args,
});

Default.args = {
  icon: <Deco />,
  intro: '쿠키꾸미기',
  path: '/store',
};
