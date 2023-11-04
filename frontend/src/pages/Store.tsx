import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import Qookie from '../components/shared/molecules/Qookie';
import Button from '../components/shared/atoms/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Title from '../components/shared/atoms/Title';
import ItemTab from '../components/store/organisms/ItemTab';
import { useEffect, useState } from 'react';
import Item, { ItemProps } from '../components/store/molecules/Item';
import { itemApi } from '../api';

export default function Store() {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [itemList, setItemList] = useState<ItemProps[][] | null>(null);

  useEffect(() => {
    if (currentTab === 0) {
      itemApi.getItemList().then((res) => {
        if (res) {
          const itemArray = res.map((item) => [item]);
          setItemList(itemArray);
        }
      });
    } else {
      itemApi.getMyItemList().then((res) => {
        if (res) {
          const itemArray = res.map((item) => [item]);
          setItemList(itemArray);
        }
      });
    }
  }, [currentTab]);

  const selectTabHandler = (now: number) => {
    setCurrentTab(now);
  };

  return (
    <PageContainer>
      <TopContainer>
        <BackgroundImg src={qookie.background} alt="bg" />
        <QookieContainer>
          <Qookie {...qookie} />
        </QookieContainer>
        <ButtonContainer>
          <Button theme={'disabled'} size="icon">
            <ShoppingCartIcon width={20} height={20} />
            구매
          </Button>
        </ButtonContainer>
      </TopContainer>
      <BottomContainer>
        <TitleTab>
          <Title
            typography="title"
            color={currentTab !== 0 ? 'var(--MR_GRAY1)' : 'var(--MR_BLACK)'}
            onClick={() => selectTabHandler(0)}
          >
            상점
          </Title>
          <Title
            typography="title"
            color={currentTab !== 1 ? 'var(--MR_GRAY1)' : 'var(--MR_BLACK)'}
            onClick={() => selectTabHandler(1)}
          >
            MY
          </Title>
        </TitleTab>
        <ItemTab />
        <ItemContainer>
          {itemList && itemList[currentTab].map((item, idx) => <Item {...item} key={idx} />)}
        </ItemContainer>
      </BottomContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  position: fixed;
`;

const TopContainer = styled.div`
  position: relative;
  top: 0;
  width: min(100%, 430px);
  height: 23rem;
  overflow: hidden;
`;

const QookieContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  transform: translate(-50%, -50%);
`;

const BackgroundImg = styled.img`
  width: 100%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0 1rem 1rem 0;
  margin-top: -2rem;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const TitleTab = styled.div`
  display: flex;
  padding: 1.5rem 1rem 0rem 1rem;
  gap: 1.3rem;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.7rem;
  padding: 0 1rem;
  overflow: auto;
  max-height: 17rem;
`;
