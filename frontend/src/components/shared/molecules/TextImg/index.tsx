import React from 'react'
import Text from '../../atoms/Text';
import styled from 'styled-components';

interface Props {
  image: string;
  desc: React.ReactNode;
}

export default function TextImgLayout( { image, desc }: Props) {
  return (
    <>
      <Layout>
        <img src={image} width={144} height={144} />
        <Text typography='main'>{desc}</Text>
      </Layout>
    </>
  )
}

const Layout = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
