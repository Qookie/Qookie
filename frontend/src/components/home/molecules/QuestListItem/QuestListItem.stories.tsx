import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import QuestListItem from '.';

const meta: Meta<typeof QuestListItem> = {
  component: QuestListItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'QuestListItem',
};

export default meta;
type Story = StoryObj<typeof QuestListItem>;

export const Default: Story = {
  name: 'wake',
  args: {
    quest: 'wake',
  }
};
