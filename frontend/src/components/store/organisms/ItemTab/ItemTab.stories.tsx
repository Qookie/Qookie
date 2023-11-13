import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ItemTab from '.';

const meta: Meta<typeof ItemTab> = {
  component: ItemTab,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'ItemTab',
};

export default meta;
type Story = StoryObj<typeof ItemTab>;

export const Default: Story = {
  name: 'tab',
};
