import { Meta, StoryObj } from '@storybook/react';
import QuestLayout from '.';
import Text from '../../../shared/atoms/Text';
import ClockImage from '../../../../assets/pngs/Clock.png';

const meta: Meta<typeof QuestLayout> = {
  component: QuestLayout,
  title: 'QuestLayout',
  render: (args) => (
    <QuestLayout {...args}>
      <img
        style={{
          display: 'block',
          margin: '0 auto',
        }}
        src={ClockImage}
      />
    </QuestLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof QuestLayout>;

export const Default: Story = {
  name: '기상 퀘스트',
  args: {
    title: '기상 체크',
    desc: '규칙적으로 일어나서 기분 좋은 하루를 시작해보세요!\n건강한 하루는 규칙적인 기상에서 시작됩니다.',
    Subcomponent: (
      <Text color="var(--MR_GRAY2)">{'아래 버튼을 클릭하면 퀘스트가 완료 됩니다.'}</Text>
    ),
    completeButtonText: '기상 완료',
    fetchQuestStatus: () => {
      return 'DEFAULT';
    },
  },
};
