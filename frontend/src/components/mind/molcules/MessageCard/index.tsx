import React from 'react'
import styled from 'styled-components'
import Text from '../../../shared/atoms/Text';
import OhQookie from '../../../../assets/pngs/ohqookie.png';

interface MessageProps {
  // category: 'HAPPY' | 'WORRY' | 'THANK' | 'ANXIETY'
  category: string;
  date: string;
  content: string;
  reply: string;
}

export default function MessageCard({ category, date, content, reply }: MessageProps) {
  return (
    <Container>
      <TopContainer>
        <Text typography='title'>감사일기</Text>
        <Text typography='main' color='var(--MR_GRAY2)'>2023-10-16</Text>
      </TopContainer>

      <ContentContainer>
        <Text>오늘은 가만히 앉아서 컴퓨터만 했는데, 생각보다 빨리 집에 갈 시간이 돼서 감사하다.</Text>
      </ContentContainer>

      <ReplyContainer>
        <QookieImg src={OhQookie} width={100} />
        <ReplyDiv>
          {reply == null ? 
          <Text color='var(--MR_GRAY2)'>오쿠키 박사가 마음 답장을 작성중이에요!</Text> : (
            <Text color='var(--MR_BLACK)'>답장입니다.</Text>)}
        </ReplyDiv>
      </ReplyContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 300px;
  border: 1px solid var(--MR_GRAY1);
  border-radius: 12px;
  padding: 20px;
  margin: 0 1rem;
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
  margin: 60px 0;
`;

const ReplyDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 115px;
  background: #f8f3eb;
  border: 0.4px solid #e5cc9a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QookieImg = styled.img`
  bottom: -21px;
  left: 5%;
  position: absolute;
  z-index: 1;
`;