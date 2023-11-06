import styled from 'styled-components';
import CartItem from '../../molecules/CartItem';
import Button from '../../../shared/atoms/Button';
import Chip from '../../../shared/molecules/Chip';
import { useEffect, useState } from 'react';
import { ItemProps, ItemTypeProps } from '../../molecules/Item';

export default function Cart() {
  const [totalItemList, setTotalItemList] = useState<ItemTypeProps[]>([]);
  const [selectedItemList, setSelectedItemList] = useState<ItemTypeProps[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const dummyData1 = [
    {
      id: 1,
      name: '토끼 모자',
      price: 10,
      media:
        'https://cdn3.vectorstock.com/i/1000x1000/10/22/seamless-triangular-patter-vector-21431022.jpg',
    },
    {
      id: 2,
      name: '다른 상품',
      price: 15,
      media: 'https://example.com/another-image.jpg',
    },
    {
      id: 3,
      name: '다른 상품',
      price: 15,
      media: 'https://example.com/another-image.jpg',
    },
  ];

  useEffect(() => {
    setTotalItemList([...totalItemList, ...dummyData1]);
  }, []);

  const selectProductHandler = (item: ItemTypeProps, checked: boolean) => {
    if (checked) {
      setSelectedItemList((prev) => [...prev, item]);
      setSelectedItemList((prev) => Array.from(new Set(prev)));
      setSelectedPrice((prev) => prev + (item.price || 0));
    } else if (selectedPrice > 0) {
      setSelectedItemList((prev) => prev.filter((item) => item.id !== item.id));
      setSelectedPrice((prev) => prev - (item.price || 0));
    }
  };



  return (
    <Container>
      <ItemContainer>

      {totalItemList.map((item, idx) => (
        <CartItem key={idx} item={item}  />
      ))}
      </ItemContainer>
      <PriceContainer>
        총 {selectedItemList.length}개의 아이템
        <Chip type="qoin" text={selectedPrice} />
      </PriceContainer>
      <Button>구매하기</Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 12.5rem;
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
