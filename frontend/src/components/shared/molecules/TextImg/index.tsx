import React from 'react';
import Text from '../../atoms/Text';
import styled from 'styled-components';

interface Props {
  image: string;
  desc: React.ReactNode;
}

export default function TextImgLayout({ image, desc }: Props) {
  return (
    <>
      <Layout>
        <ImageDiv src={image} />
        <Text typography="main">{desc}</Text>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const ImageDiv = styled.img`
  width: 144px;
`;
