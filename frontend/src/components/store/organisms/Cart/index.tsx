import styled from 'styled-components';
import CartItem from '../../molecules/CartItem';
import Button from '../../../shared/atoms/Button';
import Chip from '../../../shared/molecules/Chip';
import { useState } from 'react';
import { itemApi } from '../../../../api';
import { ItemProps } from '../../../../types/item';
import { showToast } from '../../../shared/molecules/Alert';
import { useNavigate } from 'react-router';

export interface orderReqProps {
  itemId: number;
}

interface CartProps {
  totalList: ItemProps[];
  onClose: () => void;
}

export default function Cart({ totalList, onClose }: CartProps) {
  const [selectedItemList, setSelectedItemList] = useState<ItemProps[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const navigate = useNavigate();

  const selectProductHandler = (item: ItemProps, checked: boolean) => {
    if (checked) {
      setSelectedItemList((prev) => [...prev, item]);
      setSelectedPrice((prev) => prev + (item.price || 0));
    } else if (selectedPrice > 0) {
      setSelectedItemList((prev) => prev.filter((value) => value.id !== item.id));
      setSelectedPrice((prev) => prev - (item.price || 0));
    }
  };

  const handleBuyItems = () => {
    const itemId: orderReqProps[] = [];
    selectedItemList.map((value) => itemId.push({ itemId: value.id }));
    itemApi.orderItemReq(itemId).then(() => {
      onClose();
      showToast({
        title: '아이템 구매 완료',
        content: `${selectedItemList.length}개의 상품이 구매되었습니다.`,
      });
      navigate('/store');
    });
  };

  return (
    <Container>
      <ItemContainer>
        {totalList.map((item, idx) => (
          <CartItem key={idx} item={item} handleCheck={selectProductHandler} />
        ))}
      </ItemContainer>
      <PriceContainer>
        총 {selectedItemList.length}개의 아이템
        <Chip type="qoin" text={selectedPrice} />
      </PriceContainer>
      <Button onClick={handleBuyItems}>구매하기</Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 14rem;
  overflow: auto;
  display: grid;
  gap: 0.7rem;
  padding: 0.4rem 0.8rem;
  box-sizing: border-box;
`;

const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.8rem;
  box-sizing: border-box;
`;
