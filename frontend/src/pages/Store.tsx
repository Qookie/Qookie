import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import Qookie from '../components/shared/molecules/Qookie';
import Button from '../components/shared/atoms/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Title from '../components/shared/atoms/Title';
import ItemTab, { SelectedProps } from '../components/store/organisms/ItemTab';
import { useEffect, useState } from 'react';
import { ItemTypeProps } from '../components/store/molecules/Item';
import { itemApi } from '../api';
import { QookieInfo } from '../types';

export interface AllItemProps {
  [index: number]: ItemTypeProps[];
}

export default function Store() {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [itemList, setItemList] = useState<AllItemProps>();
  const [myItemList, setMyItemList] = useState<AllItemProps>();
  const [wearItemList, setWearItemList] = useState<SelectedProps>({});
  const [showQookie, setShowQookie] = useState<QookieInfo>(qookie);
  const [itemOrder, setItemOrder] = useState<ItemTypeProps[]>([]);

  useEffect(() => {
    itemApi.getItemList().then((res) => {
      if (res) {
        setItemList(res);
      }
    });
    itemApi.getMyItemList().then((res) => {
      if (res) {
        setMyItemList(res);
      }
    });
  }, []);

  useEffect(() => {
    const newQookieWear = {
      background: checkItemLength(0),
      hat: checkItemLength(1),
      shoe: checkItemLength(2),
      bottom: checkItemLength(3),
      top: checkItemLength(4),
    };
    const accessories = checkArrLength(5);

    setShowQookie((pre) => {
      return {
        ...pre,
        ...newQookieWear,
        accessories: accessories,
      };
    });
  }, [wearItemList]);

  const checkItemLength = (index: number) => {
    if (wearItemList && wearItemList[index] && wearItemList[index].length > 0) {
      return wearItemList[index][0].media;
    }
    return '';
  };

  const checkArrLength = (index: number) => {
    if (wearItemList && wearItemList[index] && wearItemList[index].length > 0) {
      const urlList: string[] = wearItemList[index].map((item) => item.media);
      return urlList;
    }
    return [];
  };

  const selectTabHandler = (now: number) => {
    setCurrentTab(now);
  };

  const wearItemSetHandler = (list: SelectedProps) => {
    setWearItemList(list);
  };

  return (
    <PageContainer>
      <TopContainer>
        <BackgroundImg src={qookie.background} alt="bg" />
        <QookieContainer>
          <Qookie {...showQookie} />
        </QookieContainer>
        <ButtonContainer>
          <Button theme={itemOrder.length > 0 ? 'default' : 'disabled'} size="icon">
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
        <ItemTab list={currentTab === 0 ? itemList : myItemList} handleList={wearItemSetHandler} />
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
  width: min(100%, 430px);
  height: 100%;
  box-sizing: border-box;
`;

const TitleTab = styled.div`
  display: flex;
  padding: 1.5rem 1rem 0rem 1rem;
  gap: 1.3rem;
`;
