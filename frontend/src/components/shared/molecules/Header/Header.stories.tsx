import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '.';

const meta: Meta<typeof Header> = {
  component: Header,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  title: 'Header',
};

export default meta;
type Story = StoryObj<typeof Header>;

const Template: Story = {
  argTypes: {
    page: {
      type: 'string',
      control: 'select',
      options: ['tab', 'home', 'other'],
      description: '페이지',
    },
  },
  render: (args) => <Header {...args} />,
};

export const Default: Story = {
  ...Template,
  name: 'Default',
  args: {
    ...Template.args,
    page: 'home',
    title: '타이틀 테스트',
  },
};
