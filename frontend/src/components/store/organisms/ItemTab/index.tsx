import { useRef, useState } from 'react';
import styled from 'styled-components';
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

export default function ItemTab() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabSwipeRef = useRef<HTMLDivElement>(null);

  mouseSwipe(tabSwipeRef);

  const tabItem = [
    { name: 'background', icon: <BgItem /> },
    { name: 'new', icon: <NewItem /> },
    { name: 'hat', icon: <HatItem /> },
    { name: 'shoe', icon: <ShoeItem /> },
    { name: 'pant', icon: <PantsItem /> },
    { name: 'top', icon: <TopItem /> },
    { name: 'acc', icon: <ACCItem /> },
  ];

  const selectTabHandler = (idx: number) => {
    setCurrentTab(idx);
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
      <Contents></Contents>
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
  padding: 0 1.4rem;
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

const Contents = styled.div`
  width: 100%;
  display: grid;
  padding: 1rem;
  box-sizing: border-box;
  grid-template-columns: repeat(4, 1fr);
`;
