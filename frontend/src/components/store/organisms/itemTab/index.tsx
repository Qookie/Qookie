import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  ACCItem,
  BgItem,
  HatItem,
  NewItem,
  PantsItem,
  ShoeItem,
  TopItem,
} from '../../../../assets/svgs';
import mouseSwipe from '../../../../utils/mouseSwipe';
import { AllItemProps } from '../../../../pages/Store';
import Item, { ItemTypeProps } from '../../molecules/Item';

interface TabProps {
  list?: AllItemProps;
}

interface SelectedProps {
  [index: number]: ItemTypeProps[];
}

export default function ItemTab({ list }: TabProps) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabSwipeRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedProps>({});

  useEffect(() => {
    console.log('dhkldklskls', selectedItem);
  }, [selectedItem]);

  mouseSwipe(tabSwipeRef);

  const tabItem = [
    { name: 'background', icon: <BgItem /> },
    { name: 'hat', icon: <HatItem /> },
    { name: 'shoe', icon: <ShoeItem /> },
    { name: 'pant', icon: <PantsItem /> },
    { name: 'top', icon: <TopItem /> },
    { name: 'acc', icon: <ACCItem /> },
  ];

  const selectTabHandler = (idx: number) => {
    setCurrentTab(idx);
  };

  const checkItemInList = (id: number) => {
    // selectedItem 변경해도 여기 업데이트 안됨
    if (selectedItem[currentTab]) {
      return selectedItem[currentTab].some((item) => item.id === id);
    }
  };

  const selectItemHandler = (args: ItemTypeProps) => {
    setSelectedItem((prev) => {
      const newItemList = { ...prev };
      const allTabArrays = Object.values(newItemList);

      if (
        allTabArrays[currentTab] &&
        allTabArrays[currentTab].find((item) => item.id === args.id)
      ) {
        console.log('delte arr');
        allTabArrays[currentTab] = [];
      } else {
        allTabArrays[currentTab] = [args];
      }
      return allTabArrays;
    });
  };

  return (
    <Container>
      <TabContainer ref={tabSwipeRef}>
        {tabItem.map((el, idx) => (
          <IconContainer current={currentTab === idx} onClick={() => selectTabHandler(idx)}>
            {el.icon}
          </IconContainer>
        ))}
      </TabContainer>
      <ItemContainer>
        {list &&
          list[currentTab].map((item, idx) => (
            <Item
              item={item}
              key={idx}
              isChecked={selectItemHandler}
              check={checkItemInList(item.id)}
            />
          ))}
      </ItemContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const TabContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background: #f8f8f8;
  padding: 0.6rem 0;
`;

const IconContainer = styled.div<{ current: boolean }>`
  height: 100%;
  padding: 0 2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${({ current }) =>
    current &&
    `
    & > svg > path {
      fill: var(--MR_RED);
    }
    `}
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.7rem;
  padding: 1rem;
  overflow: auto;
  max-height: 17rem;
`;
