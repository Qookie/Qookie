import React from 'react';
import styled from 'styled-components';
import Title from '../../atoms/Title';
import Text from '../../atoms/Text';

interface Props {
  title: React.ReactNode;
  desc?: React.ReactNode;
  children?: React.ReactNode;
}

function TitleLayout({ title, desc, children }: Props) {
  return (
    <Container>
      <Top>
        <Title typography="title">{title}</Title>
        {desc && <Text color="var(--MR_GRAY2)">{desc}</Text>}
      </Top>

      <MainContainer>{children}</MainContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  box-sizing: border-box;
  margin-top: 80px;
  padding: 0 1rem;
  margin-bottom: 8vh;
`;

export default TitleLayout;
