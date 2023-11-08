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
import { QookieInfo, wearReqType } from '../types';
import BottomSheet from '../components/shared/molecules/BottomSheet';
import Cart from '../components/store/organisms/Cart';
import { history } from '../utils/history';
import Dialog from '../components/shared/molecules/Dialog';
import { useNavigate } from 'react-router-dom';

export interface AllItemProps {
  [index: number]: ItemTypeProps[];
}

export default function Store() {
  const navigate = useNavigate();
  const [qookie, setQookie] = useRecoilState(QookieInfoState);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [itemList, setItemList] = useState<AllItemProps>();
  const [myItemList, setMyItemList] = useState<AllItemProps>();
  const [wearItemList, setWearItemList] = useState<SelectedProps>({});
  const [cartItemList, setCartItemList] = useState<SelectedProps>({});
  const [showQookie, setShowQookie] = useState<QookieInfo>(qookie);
  const [isItem, setIsItem] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isExit, setIsExit] = useState<boolean>(false);

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
    const wearItems: SelectedProps = {};
    if (myItemList) {
      for (const index in myItemList) {
        myItemList[index].map((item: ItemTypeProps) => {
          if (item.isWear) {
            wearItems[index] = [item];
          }
        });
      }
    }
    setWearItemList(wearItems);
  }, [myItemList]);

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

  useEffect(() => {
    let count = 0;
    for (const i in cartItemList) {
      count += cartItemList[i].length;
    }
    if (count > 0) {
      setIsItem(true);
    } else {
      setIsItem(false);
    }
  }, [cartItemList]);

  useEffect(() => {
    const checkBackEvent = () => {
      if (isItem) {
        // modal open
        setIsExit(true);
        navigate('/store');
      } else {
        exitStoreHandler();
      }
    };

    const unCheckBackEvent = history.listen(({ action }) => {
      if (action === 'POP') {
        checkBackEvent();
      }
    });

    return unCheckBackEvent;
  }, [isItem, wearItemList]);

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

  const getWearItemId = (index: number) => {
    console.log('wear list', wearItemList);
    if (wearItemList && wearItemList[index] && wearItemList[index].length > 0) {
      if (index === 1) console.log('hat', wearItemList[index][0]);
      return wearItemList[index][0].id;
    }
    if (index === 0) {
      return 2;
    } else {
      return 1;
    }
  };

  const getWearItemArr = (index: number) => {
    if (wearItemList && wearItemList[index] && wearItemList[index].length > 0) {
      const idList: number[] = wearItemList[index].map((item) => item.id);
      return idList;
    }
    return [1];
  };

  const selectTabHandler = (now: number) => {
    setCurrentTab(now);
  };

  const wearItemSetHandler = (list: SelectedProps) => {
    setWearItemList(list);
  };

  const cartItemSetHandler = (list: SelectedProps) => {
    setCartItemList(list);
  };

  const onCartHandler = () => {
    setIsCartOpen((pre) => !pre);
  };

  const exitModal = () => {
    setIsExit(false);
  };

  const exitStoreHandler = () => {
    console.log('exit');
    const checkItemChange: wearReqType = {
      backgroundId: getWearItemId(0),
      hatId: getWearItemId(1),
      shoeId: getWearItemId(2),
      bottomId: getWearItemId(3),
      topId: getWearItemId(4),
      accessories: getWearItemArr(5),
    };

    itemApi.wearItemReq(checkItemChange).then((res) => {
      console.log(res);
      setQookie({ ...qookie, ...showQookie });
      navigate('/mypage');
    });
  };

  return (
    <PageContainer>
      <TopContainer>
        <BackgroundImg src={qookie.background} alt="bg" />
        <QookieContainer>
          <Qookie {...showQookie} />
        </QookieContainer>
        <ButtonContainer>
          <Button theme={isItem ? 'default' : 'disabled'} size="icon" onClick={onCartHandler}>
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
        <ItemTab
          list={currentTab === 0 ? itemList : myItemList}
          handleList={wearItemSetHandler}
          handleCart={currentTab === 0 ? cartItemSetHandler : undefined}
        />
      </BottomContainer>
      <BottomSheet
        isOpen={isCartOpen}
        title={'장바구니'}
        onClose={onCartHandler}
        children={<Cart list={cartItemList} handleList={cartItemSetHandler} />}
      />
      <Dialog
        title="장착한 아이템이 사라져요"
        content={`구매하지 않은 장착 아이템은 저장되지 않아요 \n구매하지 않고 나가시겠어요?`}
        negative="구매하기"
        onNegativeClick={onCartHandler}
        positive="나가기"
        onPositiveClick={exitStoreHandler}
        isopen={isExit}
        onCloseRequest={exitModal}
      />
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
