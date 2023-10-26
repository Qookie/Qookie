import { StoryObj, Meta } from '@storybook/react';
import Mouth from '.';

const meta: Meta<typeof Mouth> = {
  component: Mouth,
  title: 'Mouth',
};

export default meta;
type Story = StoryObj<typeof Mouth>;

export const Default: Story = {};
