import styled from 'styled-components';
import Chip from '../../../shared/molecules/Chip';
import { Qoin } from '../../../../assets/svgs';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import NewItem from '../../../../assets/pngs/new.png';
import { ItemProps } from '../../../../types/item';

export interface ItemPageProps {
  item: ItemProps;
  chip?: boolean;
  handleCheck?: (item: ItemProps) => boolean;
  isCheck: boolean;
}

export default function Item({ item, chip, handleCheck, isCheck }: ItemPageProps) {
  const selectHandler = () => {
    if (handleCheck) {
      handleCheck(item);
    }
  };

  return (
    <Container onClick={selectHandler} state={isCheck}>
      {item.media ? (
        <ItemContainer>
          <ItemImg src={item.thumbnail} alt={item.name} />
          {item.isNew && <NewIcon src={NewItem} alt={'new'} />}
        </ItemContainer>
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
  box-shadow: ${({ state }) => (state ? '0 0 0 2px var(--MR_RED) inset' : '0 0 6px 1px #e0e0e070')};
`;

const ItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  position: relative;
  z-index: -1;
`;

const NewIcon = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  z-index: 1;
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
