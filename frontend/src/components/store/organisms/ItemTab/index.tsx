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
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const tabSwipeRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedProps>({});

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

  const selectItemHandler = (args: ItemTypeProps) => {
    setSelectedItem((prev) => {
      const newSelectedItem = { ...prev };

      // 모든 탭에 대한 선택 항목 배열 가져오기
      const allTabArrays = Object.values(newSelectedItem);

      // 아이템을 추가할 탭 배열 초기화
      let tabArrayToAddItem = [];

      // 모든 탭 배열을 순회하면서 args.id와 일치하는 아이템 찾고 제거
      allTabArrays.forEach((currentTabArray, index) => {
        const matchingItemIndex = currentTabArray.findIndex((item) => item.id === args.id);

        if (matchingItemIndex !== -1) {
          currentTabArray.splice(matchingItemIndex, 1);
        }

        // 현재 탭의 아이템이 args.id와 일치하지 않는 경우, 해당 탭을 추가할 배열로 설정
        if (index === currentTab) {
          tabArrayToAddItem = currentTabArray;
        }
      });

      // args.id와 일치하는 아이템을 새로운 탭 배열에 추가
      tabArrayToAddItem.push(args);

      // 선택 항목 업데이트
      newSelectedItem[currentTab] = tabArrayToAddItem;

      return newSelectedItem;
    });
    console.log('checkeddkdkdk', selectedItem);
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
            <Item item={item} key={idx} isChecked={selectItemHandler} check={isSelected} />
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
