import { NotificationProp } from '../../../../types';
import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';


export default function NotificationContent({ prop }: { prop: NotificationProp }) {

  const selected = () => {
    switch (prop.category) {
      case 'alarm':
        return `기상 시간이에요!!!\n기상 체크 퀘스트를 완료해주세요.`;
      case 'challenge':
        return `${prop.info} 챌린지 완료!`;
      case 'cookie':
        return `${prop.info}가 당신을 기다리고 있어요!`;
      case 'heart':
        return `${prop.info}의 마음 답장이 도착했어요!`;
      case 'item':
        return `따끈따끈하게 출시된 아이템: ${prop.info}!!!.`;
      case 'quest':
        return `추가 퀘스트 도착!\n${prop.info}를 완료하면 추가 보상이 주어져요.`;
      default:
        return <></>;
    }
  }
  return (
    <ContentContainer>
      <Text typography='main'>{selected()}</Text>
      <Text typography='weak'>{prop.createdAt}</Text>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  margin-top: 0.8vh;
  display: flex;
  flex-direction: column;
`;
const CreatedAtStyle = styled.div`

`;
