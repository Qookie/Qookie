import React from 'react';
import styled from 'styled-components';

interface Props {
  condition: number;
  img: string;
}

function BadgeItem({ condition, img }: Props) {
  return (
    <Container>
      <Img src={img} alt="badge" />
      <ConditionText>{`누적 ${condition}일`}</ConditionText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Img = styled.img`
  width: 100px;
`;

const ConditionText = styled.div`
  color: var(--MR_GRAY2);
  font-weight: 600;
`;

export default BadgeItem;
