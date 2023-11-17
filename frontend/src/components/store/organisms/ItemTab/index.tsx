import styled from 'styled-components';
import Item from '../../molecules/Item';
import { ItemProps } from '../../../../types/item';
import { useRecoilValue } from 'recoil';
import { QookieInfoState } from '../../../../modules/qookie';
import { useEffect, useState } from 'react';
import Error from '../../../shared/atoms/error';

interface TabProps {
  curCategory: string;
  tabItemProps: () => ItemProps[];
  handleCheck: (item: ItemProps) => boolean;
  isCheck: (item: ItemProps) => boolean;
}

export default function ItemTab({ curCategory, tabItemProps, handleCheck, isCheck }: TabProps) {
  const itemList: ItemProps[] = tabItemProps();
  const [lockItem, setLockItem] = useState<boolean>(false);
  const qookie = useRecoilValue(QookieInfoState);

  const levelCheck = () => {
    const level = qookie.level;
    if (curCategory === 'accessories' || curCategory === 'top') {
      if (level >= 40) {
        return true;
      }
    }
    if (curCategory === 'bottom') {
      if (level >= 30) {
        return true;
      }
    }
    if (curCategory === 'shoe') {
      if (level >= 20) {
        return true;
      }
    }
    if (curCategory === 'hat') {
      if (level >= 10) {
        return true;
      }
    }
    if (curCategory === 'background') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const res = levelCheck();
    setLockItem(res);
  }, [curCategory]);

  return (
    <Container>
      {lockItem ? (
        <ItemContainer>
          {itemList &&
            itemList.map((item) => (
              <Item item={item} key={item.id} handleCheck={handleCheck} isCheck={isCheck(item)} />
            ))}
        </ItemContainer>
      ) : (
        <LockContainer>
          <Error children="지금 레벨에서는 착용할 수 없어요ㅠ" />
        </LockContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const LockContainer = styled.div`
  padding: 5rem 0;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  color: var(--MR_GRAY2);
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.7rem;
  padding: 1rem;
  overflow: auto;
  max-height: 17rem;
`;
