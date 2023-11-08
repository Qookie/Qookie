import styled from 'styled-components';
import CartItem from '../../molecules/CartItem';
import Button from '../../../shared/atoms/Button';
import Chip from '../../../shared/molecules/Chip';
import { useEffect, useState } from 'react';
import { ItemTypeProps } from '../../molecules/Item';
import { TabProps } from '../ItemTab';
import { itemApi } from '../../../../api';

export interface orderReqProps {
  itemId: number;
}

export default function Cart({ list, handleList }: TabProps) {
  const [totalItemList, setTotalItemList] = useState<ItemTypeProps[]>([]);
  const [selectedItemList, setSelectedItemList] = useState<ItemTypeProps[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  useEffect(() => {
    const itemList: ItemTypeProps[] = [];
    for (const row in list) {
      list[Number(row)].map((item) => itemList.push(item));
    }
    setTotalItemList(itemList);
  }, [list]);

  const selectProductHandler = (item: ItemTypeProps, checked: boolean) => {
    if (checked) {
      setSelectedItemList((prev) => [...prev, item]);
      setSelectedItemList((prev) => Array.from(new Set(prev)));
      setSelectedPrice((prev) => prev + (item.price || 0));
    } else if (selectedPrice > 0) {
      setSelectedItemList((prev) => prev.filter((value) => value.id !== item.id));
      setSelectedPrice((prev) => prev - (item.price || 0));
    }
  };

  const handleBuyItems = () => {
    const itemId: orderReqProps[] = [];
    selectedItemList.map((value) => itemId.push({ itemId: value.id }));
    itemApi.orderItemReq(itemId).then((res) => console.log('orderItemReq', res));
  };

  return (
    <Container>
      <ItemContainer>
        {totalItemList.map((item, idx) => (
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
