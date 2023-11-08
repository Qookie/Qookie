import styled from 'styled-components';
import Item, { ItemProps, ItemTypeProps } from '../Item';
import { useEffect, useState } from 'react';
import Chip from '../../../shared/molecules/Chip';
import Text from '../../../shared/atoms/Text';

export default function CartItem({ item, handleCheck }: ItemProps) {
  const [cartItem, setCartItem] = useState<ItemTypeProps>(item);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setCartItem(item);
  }, []);

  useEffect(() => {
    if (cartItem) {
      const newItem = {
        id: cartItem.id,
        media: cartItem.media,
        thumbnail: cartItem.thumbnail,
        name: cartItem.name,
        price: cartItem.price,
      };
      if (handleCheck) {
        handleCheck(newItem, isSelected);
      }
    }
  }, [isSelected]);

  const handleSelectItem = () => {
    setIsSelected((pre) => !pre);
  };

  return (
    <Container>
      <StyledInput type="checkbox" onChange={handleSelectItem} />
      <ImageContainer>{cartItem && <Item item={cartItem} chip={false} />}</ImageContainer>
      <RightSection>
        <Text typography="button">{cartItem?.name}</Text>
        {cartItem && <Chip type="qoin" text={cartItem.price ? cartItem.price : ''} />}
      </RightSection>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
`;

const StyledInput = styled.input`
  accent-color: var(--MR_RED);
  width: 1rem;
  height: 1rem;
`;

const ImageContainer = styled.div`
  width: 5rem;
  margin-left: 0.4rem;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 1rem;
`;
