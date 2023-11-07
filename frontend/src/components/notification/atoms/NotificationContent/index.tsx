import { NotificationProp } from '../../../../types';
import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { toBeforeString } from '../../../../utils/date';

export default function NotificationContent({ prop }: { prop: NotificationProp }) {

  const selected = () => {
    switch (prop.category) {
      case 'Alarm':
        return `기상 시간이에요!!!\n기상 체크 퀘스트를 완료해주세요.`;
      case 'Challenge':
        return `${prop.info} 챌린지 완료!`;
      case 'Cookie':
        return `${prop.info}가 당신을 기다리고 있어요!`;
      case 'Heart':
        return `${prop.info}의 마음 답장이 도착했어요!`;
      case 'Item':
        return `따끈따끈하게 출시된 아이템: ${prop.info}!!!.`;
      case 'Quest':
        return `추가 퀘스트 도착!\n${prop.info}를 완료하면 추가 보상이 주어져요.`;
      default:
        return <></>;
    }
  }
  return (
    <ContentContainer>
      <Text typography='compact'>{selected()}</Text>
      <Text typography='weak' color='gray'>{toBeforeString(prop.createdAt)}</Text>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  margin-top: 0.8vh;
  padding-bottom: 0.8vh;
  display: flex;
  flex-direction: column;
`;
const CreatedAtStyle = styled.div`

`;
