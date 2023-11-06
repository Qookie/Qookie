import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Chip from '../../../shared/molecules/Chip';
import { Qoin } from '../../../../assets/svgs';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

export interface ItemTypeProps {
  id: number;
  name: string;
  media: string;
  price?: number;
  isNew?: boolean;
}

export interface ItemProps {
  item: ItemTypeProps;
  chip?: boolean;
  isChecked?: (...args: (boolean | ItemTypeProps | any)[]) => void;
  check?: boolean;
}

export default function Item({ item, chip, isChecked, check }: ItemProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (check === false) {
      setIsClicked(false);
    }
  }, [check]);

  useEffect(() => {
    console.log('step 1');
    if (isChecked) {
      isChecked(item);
    }
  }, [isClicked]);

  const selectHandler = () => {
    setIsClicked((pre) => !pre);
  };

  return (
    <Container onClick={selectHandler} state={isClicked}>
      {item.media ? (
        <ItemImg src={item.media} alt={item.name} />
      ) : (
        <NoneItem>
          <NoSymbolIcon width={40} height={40} />
        </NoneItem>
      )}
      {chip !== false && item.price && (
        <ChipContainer>
          <Chip type="qoin" icon={<Qoin />} text={item.price} />
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
  border-radius: 0.75rem;
  box-shadow: ${({ state }) => state && '0 0 0 2px var(--MR_RED) inset'};
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  position: relative;
  z-index: -1;
`;

const NoneItem = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 0 0 2px var(--MR_GRAY1) inset;
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  color: var(--MR_GRAY1);
`;

const ChipContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding-bottom: 0.25rem;
`;
