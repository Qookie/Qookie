import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import OhQookie from '../../../../assets/pngs/ohqookie.png';

export interface MessageProps {
  category: 'HAPPY' | 'WORRY' | 'THANKS' | 'ANXIETY';
  createdAt: string;
  content: string;
  reply: string;
}

export default function MessageCard({ category, createdAt, content, reply }: MessageProps) {
  return (
    <Container>
      <TopContainer>
        <Text typography="title">{category} 일기</Text>
        <Text typography="main" color="var(--MR_GRAY2)">
          {createdAt.toString().split('T')[0]}
        </Text>
      </TopContainer>

      <ContentContainer>
        <Text>{content}</Text>
      </ContentContainer>

      <ReplyContainer>
        <QookieImg src={OhQookie} width={100} />
        <ReplyDiv>
          {reply == null ? (
            <Text color="var(--MR_GRAY2)">오쿠키 박사가 마음 답장을 작성중이에요!</Text>
          ) : (
            <Text color="var(--MR_BLACK)">{reply}</Text>
          )}
        </ReplyDiv>
      </ReplyContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 150px;
  border: 1px solid var(--MR_GRAY1);
  border-radius: 12px;
  padding: 20px;
  margin: 15px 1rem;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding: 16px 0;
`;

const ReplyContainer = styled.div`
  position: relative;
  margin-top: 40px;
`;

const ReplyDiv = styled.div`
  top: 0;
  min-height: 115px;
  background: #f8f3eb;
  border: 0.4px solid #e5cc9a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const QookieImg = styled.img`
  top: -40px;
  left: 5%;
  position: absolute;
  z-index: 1;
`;
