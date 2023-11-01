import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Dialog from '.';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'Dialog',
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  name: 'confirm',
  args: {
    title: '테스트 타이틀',
    content: '콘텐츠 테스트 테스트 콘텐츠 콘텐츠 테스트 테스트 콘텐츠',
    negative: '삭제',
    positive: '통과',
  },
};
