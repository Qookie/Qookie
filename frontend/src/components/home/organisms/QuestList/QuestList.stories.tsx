import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import QuestList from '.';

const meta: Meta<typeof QuestList> = {
  component: QuestList,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'QuestList',
};

export default meta;
type Story = StoryObj<typeof QuestList>;

export const Default: Story = {
  name: 'today',
  args: {
    title: '일일 퀘스트',
  },
};
