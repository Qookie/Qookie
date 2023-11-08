import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ACCItem, BgItem, HatItem, PantsItem, ShoeItem, TopItem } from '../../../../assets/svgs';
import mouseSwipe from '../../../../utils/mouseSwipe';
import { AllItemProps } from '../../../../pages/Store';
import Item, { ItemTypeProps } from '../../molecules/Item';

interface TabProps {
  list?: AllItemProps;
  handleList: (list: SelectedProps) => void;
  handleCart?: (list: SelectedProps) => void;
}

export interface SelectedProps {
  [index: number]: ItemTypeProps[];
}

const SelectedDefault = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};

export default function ItemTab({ list, handleList, handleCart }: TabProps) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabSwipeRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedProps>(SelectedDefault);
  const [listToBuy, setListToBuy] = useState<SelectedProps>(SelectedDefault);

  useEffect(() => {
    handleList(selectedItem);
    console.log('real item list', selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (handleCart) {
      handleCart(listToBuy);
      console.log('list to buy', listToBuy);
    }
  }, [listToBuy]);

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
    if (handleCart) {
      handleCartItemList(args);
    }
    handleWearItemList(args);
  };

  const handleWearItemList = (args: ItemTypeProps) => {
    if (currentTab === 5) {
      setSelectedItem((prev) => {
        const newArr = { ...prev };
        const currentTabArray = newArr[currentTab];

        if (currentTabArray === undefined || !currentTabArray.some((item) => item.id === args.id)) {
          newArr[currentTab] = [...currentTabArray, args];
        } else {
          newArr[currentTab] = currentTabArray.filter((item) => item.id !== args.id);
        }
        return newArr;
      });
    } else {
      setSelectedItem((prev) => {
        const newArr = { ...prev };
        const currentTabArray = newArr[currentTab];

        if (currentTabArray === undefined || currentTabArray[0] === undefined) {
          newArr[currentTab] = [args];
        } else {
          if (currentTabArray[0].id === args.id) {
            newArr[currentTab] = [];
          } else {
            newArr[currentTab] = [args];
          }
        }
        return newArr;
      });
    }
  };

  const handleCartItemList = (args: ItemTypeProps) => {
    if (currentTab === 5) {
      setListToBuy((prev) => {
        const newArr = { ...prev };
        const currentTabArray = newArr[currentTab];

        if (currentTabArray === undefined || !currentTabArray.some((item) => item.id === args.id)) {
          newArr[currentTab] = [...currentTabArray, args];
        } else {
          newArr[currentTab] = currentTabArray.filter((item) => item.id !== args.id);
        }
        return newArr;
      });
    } else {
      setListToBuy((prev) => {
        const newArr = { ...prev };
        const currentTabArray = newArr[currentTab];

        if (currentTabArray === undefined || currentTabArray[0] === undefined) {
          newArr[currentTab] = [args];
        } else {
          if (currentTabArray[0].id === args.id) {
            newArr[currentTab] = [];
          } else {
            newArr[currentTab] = [args];
          }
        }
        return newArr;
      });
    }
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
          list[currentTab].map((item, index) => (
            <Item
              item={item}
              key={index}
              handleCheck={selectItemHandler}
              select={selectedItem[currentTab]}
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
