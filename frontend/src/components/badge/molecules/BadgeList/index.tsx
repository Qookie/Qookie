import React from 'react';
import Text from '../../../shared/atoms/Text';
import BadgeItem from '../../atoms/BadgeItem';
import { BadgeConditionalImage, Badges } from '../../../../pages/Badge';
import styled from 'styled-components';
import NoBadge from '../../../../../assets/pngs/NoBadge.png';

interface Props {
  badges: BadgeConditionalImage;
  title: string;
}

function BadgeList({ badges, title }: Props) {
  return (
    <>
      <Text typography="title">{title}</Text>
      <BadgeContainer>
        <BadgeItem condition={badges.firstBadge.condition} img={badges.firstBadge.url ?? NoBadge} />
        <BadgeItem
          condition={badges.secondBadge.condition}
          img={badges.secondBadge.url ?? NoBadge}
        />
        <BadgeItem condition={badges.thirdBadge.condition} img={badges.thirdBadge.url ?? NoBadge} />
      </BadgeContainer>
    </>
  );
}

const BadgeContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
`;

export default BadgeList;
