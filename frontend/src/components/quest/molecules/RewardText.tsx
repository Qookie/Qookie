import React from 'react';
import styled from 'styled-components';
import { ReactComponent as QoinIcon } from '../../../assets/svgs/qoin.svg';
import { ReactComponent as FlourIcon } from '../../../assets/svgs/flour.svg';

function RewardText() {
  return (
    <Container>
      <FlourIcon />
      +10
      {'  '}
      <QoinIcon width={17} height={17} />
      +10
    </Container>
  );
}

export default RewardText;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
