import { StoryObj, Meta } from '@storybook/react';
import TotalQookie from '.';

const meta: Meta<typeof TotalQookie> = {
  component: TotalQookie,
  title: 'TotalQookie',
};

export default meta;
type Story = StoryObj<typeof TotalQookie>;

export const Default: Story = {};
