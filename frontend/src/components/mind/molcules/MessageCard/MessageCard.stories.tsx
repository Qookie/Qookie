import type { Meta, StoryObj } from '@storybook/react';
import MessageCard from '.';

const meta: Meta<typeof MessageCard> = {
  component: MessageCard,
  title: 'MessageCard',
};

export default meta;
type Story = StoryObj<typeof MessageCard>;

export const Default: Story = {
  render: (args) => <MessageCard content='내용' reply='답장' createdAt='2023-11-11' category='HAPPY' />,
};
