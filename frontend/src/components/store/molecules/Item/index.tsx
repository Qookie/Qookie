import { useRef, useState } from 'react';
import styled from 'styled-components';
import Chip from '../../../shared/molecules/Chip';
import { Qoin } from '../../../../assets/svgs';

export interface ItemProps {
  id: number;
  name: string;
  media: string;
  price?: number;
  isNew?: boolean;
  isSelected?: () => void;
}

export default function Item({ ...props }: ItemProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const selectHandler = () => {
    setIsClicked((pre) => !pre);
    props.isSelected;
  };

  return (
    <Container onClick={selectHandler} state={isClicked}>
      <ItemImg src={props.media} alt={props.name} />
      {props.price && (
        <ChipContainer>
          <Chip type="qoin" icon={<Qoin />} text={props.price} />
        </ChipContainer>
      )}
    </Container>
  );
}

const Container = styled.div<{ state: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ state }) => state && '0 0 0 2px var(--MR_RED) inset'};
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  position: relative;
  z-index: -1;
`;

const ChipContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding-bottom: 0.25rem;
`;
