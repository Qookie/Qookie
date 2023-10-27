import React from 'react';
import styled from 'styled-components';
import Title from '../../atoms/Title';
import Text from '../../atoms/Text';

interface Props {
  title: React.ReactNode;
  desc?: React.ReactNode;
  children: React.ReactNode;
}

function TitleLayout({ title, desc, children }: Props) {
  return (
    <>
      <Top>
        <Title typography="title">{title}</Title>
        {desc && <Text>{desc}</Text>}
      </Top>

      <div>{children}</div>
    </>
  );
}

const Top = styled.div`
  margin-top: 7vh;
  padding: 0 1rem;
  margin-bottom: 8vh;
`;

export default TitleLayout;
