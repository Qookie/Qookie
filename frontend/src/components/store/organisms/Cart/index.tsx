import styled from 'styled-components';
import CartItem from '../../molecules/CartItem';
import Button from '../../../shared/atoms/Button';
import Chip from '../../../shared/molecules/Chip';
import { useEffect, useState } from 'react';
import { itemApi } from '../../../../api';
import { ItemProps } from '../../../../types/item';
import { showToast } from '../../../shared/molecules/Alert';
import Error from '../../../shared/atoms/error';

export interface orderReqProps {
  itemId: number;
}

interface CartProps {
  totalList: ItemProps[];
  onClose: () => void;
  isComplete: () => void;
  curQoin: number;
}

export default function Cart({ totalList, onClose, isComplete, curQoin }: CartProps) {
  const [selectedItemList, setSelectedItemList] = useState<ItemProps[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [haveQoin, setHaveQoin] = useState<boolean>(false);

  useEffect(() => {
    checkEnoughQoin();
  }, [selectedPrice]);

  const checkEnoughQoin = () => {
    if (selectedPrice <= curQoin) {
      setHaveQoin(true);
    } else {
      setHaveQoin(false);
    }
  };

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
      showToast({
        title: '아이템 구매 완료',
        content: `${selectedItemList.length}개의 상품이 구매되었습니다.`,
      });
      isComplete();
      onClose();
    });
  };

  return (
    <Container>
      <ItemContainer>
        {totalList.length > 0 ? (
          totalList.map((item, idx) => (
            <CartItem key={idx} item={item} handleCheck={selectProductHandler} />
          ))
        ) : (
          <Error children={`장바구니에 담은\n아이템이 없습니다`} />
        )}
      </ItemContainer>
      <PriceContainer>
        총 {selectedItemList.length}개의 아이템
        <Chip type="qoin" text={selectedPrice} />
      </PriceContainer>
      <Button
        onClick={handleBuyItems}
        themes={haveQoin && selectedItemList.length > 0 ? 'default' : 'disabled'}
        disabled={!haveQoin || selectedItemList.length === 0}
      >
        {selectedItemList.length > 0
          ? haveQoin
            ? '구매하기'
            : '코인이 부족합니다'
          : '선택된 아이템이 없습니다'}
      </Button>
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
