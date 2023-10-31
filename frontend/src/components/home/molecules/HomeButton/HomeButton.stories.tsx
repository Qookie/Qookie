import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import HomeButton from '.';

const meta: Meta<typeof HomeButton> = {
  component: HomeButton,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'HomeButton',
};

export default meta;
type Story = StoryObj<typeof HomeButton>;

export const Default: Story = {
  name: 'Default',
  args: {
    title: '출석체크'
  }
};
