import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import Qookie from '../components/shared/molecules/Qookie';
import Button from '../components/shared/atoms/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Title from '../components/shared/atoms/Title';
import ItemTab from '../components/store/organisms/ItemTab';
import { useEffect, useRef, useState } from 'react';
import { itemApi, qoinApi } from '../api';
import { QookieInfo, wearReqType } from '../types';
import BottomSheet from '../components/shared/molecules/BottomSheet';
import Cart from '../components/store/organisms/Cart';
import { history } from '../utils/history';
import Dialog from '../components/shared/molecules/Dialog';
import { useNavigate } from 'react-router-dom';
import {
  AllItemProps,
  DefaultAllItem,
  DefaultSelected,
  ItemProps,
  SelectedItemProps,
} from '../types/item';
import { ACCItem, BgItem, HatItem, PantsItem, ShoeItem, TopItem } from '../assets/svgs';
import mouseSwipe from '../utils/mouseSwipe';
import Chip from '../components/shared/molecules/Chip';

export default function Store() {
  const navigate = useNavigate();
  const [qookie, setQookie] = useRecoilState(QookieInfoState);
  // selectedItemList 에는 qookie info 가 없어서 showQookie 필요
  const [showQookie, setShowQookie] = useState<QookieInfo>(qookie);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [curQoin, setCurQoin] = useState<number>(0);
  const [curCategory, setCurCategory] = useState<string>('background');
  // api 호출로 받아오는 리스트
  const [itemList, setItemList] = useState<AllItemProps>(DefaultAllItem);
  const [myItemList, setMyItemList] = useState<AllItemProps>(DefaultAllItem);
  // 선택된(입은) 아이템 리스트
  const [selectedItemList, setSelectedItemList] = useState<SelectedItemProps>(DefaultSelected);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isExit, setIsExit] = useState<boolean>(false);

  const tabSwipeRef = useRef<HTMLDivElement>(null);
  mouseSwipe(tabSwipeRef);

  useEffect(() => {
    setShowQookie({ ...qookie, ...selectedItemList });
  }, [selectedItemList]);

  // recoil 에 있는 내 아이템을 selected default 로 지정
  const defaultItemList = {
    background: qookie.background,
    hat: qookie.hat,
    shoe: qookie.shoe,
    bottom: qookie.bottom,
    top: qookie.top,
    accessories: qookie.accessories,
  };

  useEffect(() => {
    setSelectedItemList(defaultItemList);
  }, [qookie]);

  useEffect(() => {
    // 시작하면 item list 불러오기
    getAllItemList();
    getMyItemList();
    getCurQoinList();
  }, []);

  const getCurQoinList = () => {
    qoinApi.getQoinList().then((res) => {
      if (res) {
        setCurQoin(res);
      }
    });
  };

  const getAllItemList = () => {
    // all item list 불러오기
    itemApi.getItemList().then((res) => {
      if (res) {
        setItemList(res);
      }
    });
  };

  const getMyItemList = () => {
    // my item list 불러오기
    itemApi.getMyItemList().then((res) => {
      if (res) {
        setMyItemList(res);
      }
    });
  };

  const changeSelectItemHandler = (item: ItemProps) => {
    // selected item list 내용 바꾸기 & selected 값 반환
    const tab = curCategory as keyof SelectedItemProps;
    if (Array.isArray(selectedItemList[tab])) {
      // array 인지 확인 : accessories 인 경우
      if ((selectedItemList[tab] as ItemProps[]).some((value) => value.id === item.id)) {
        // 이미 있는 경우(취소)면 filter 로 삭제
        const updatedList: ItemProps[] = (selectedItemList[tab] as ItemProps[]).filter(
          (value) => value.id !== item.id,
        );
        if (updatedList.length === 0) {
          updatedList.push({ id: 1, media: null });
        }
        setSelectedItemList((prev) => ({ ...prev, [tab]: updatedList }));
        return false;
      } else {
        // 없으면 추가
        if (item.id === 1) {
          // 전체삭제 버튼이면?
          setSelectedItemList((prev) => ({ ...prev, [tab]: DefaultSelected[tab] }));
          return false;
        } else {
          const updatedList = (selectedItemList[tab] as ItemProps[]).filter(
            (value) => value.id !== 1,
          );
          setSelectedItemList((prev) => {
            const newValue = [...updatedList, item];
            return { ...prev, [tab]: newValue };
          });
        }
        return true;
      }
    } else {
      // acc 제외 단일 객체인 경우
      if (
        selectedItemList[tab] &&
        'id' in selectedItemList[tab] &&
        item.id === (selectedItemList[tab] as ItemProps).id
      ) {
        // 있는 경우(취소)는 default item 으로 변경
        setSelectedItemList((prev) => ({ ...prev, [tab]: DefaultSelected[tab] }));
        return false;
      } else {
        // 없으면 선택에 추가
        setSelectedItemList((prev) => ({ ...prev, [tab]: item }));
        return true;
      }
    }
  };

  const categoryTab = {
    background: <BgItem />,
    hat: <HatItem />,
    shoe: <ShoeItem />,
    bottom: <PantsItem />,
    top: <TopItem />,
    accessories: <ACCItem />,
  };

  const checkItemToBuy = () => {
    const cartItemList: ItemProps[] = [];

    Object.keys(categoryTab).forEach((category) => {
      const tab = category as keyof SelectedItemProps;

      if (tab === 'accessories') {
        // acc 는 리스트니까 확인해서 하나씩 넣어주기
        selectedItemList[tab].forEach((acc) => {
          if (!myItemList[tab].some((item) => item.id === acc.id)) {
            // myItemList에 없는 경우에만 추가
            cartItemList.push(acc);
          }
        });
      } else {
        // acc 제외하고 myItemList 에 없으면 cartItemList 에 추가
        if (!myItemList[tab].some((item) => item.id === selectedItemList[tab].id)) {
          // myItemList에 없는 경우에만 추가
          cartItemList.push(selectedItemList[tab]);
        }
      }
    });
    return cartItemList;
  };

  const handleCompleteBuy = () => {
    getCurQoinList();
    getAllItemList();
    getMyItemList();
  };

  const resetItem = () => {
    // 그냥 나가는 경우 내 상품 아니면 제외
    const filterdItemList: SelectedItemProps = selectedItemList;
    for (const category of Object.keys(categoryTab)) {
      const tab = category as keyof SelectedItemProps;
      if (tab === 'accessories') {
        for (const acc of filterdItemList[tab]) {
          const matchingItems = myItemList[tab].some((item) => item.id === acc.id);
          if (!matchingItems) {
            const updatedList = (filterdItemList[tab] as ItemProps[]).filter(
              (value) => value.id !== acc.id,
            );
            filterdItemList[tab] = updatedList;
          }
        }
      } else {
        const matchingItems = myItemList[tab].some((item) => item.id === filterdItemList[tab].id);
        if (!matchingItems) {
          filterdItemList[tab] = DefaultSelected[tab];
        }
      }
    }
    return filterdItemList;
  };

  useEffect(() => {
    // 뒤로가기 감지
    const checkBackEvent = () => {
      if (checkItemToBuy().length > 0) {
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
  }, [selectedItemList]);

  const selectAllTabHandler = async () => {
    // 상점 tab 클릭시
    await getAllItemList();
    setCurrentTab(0);
  };

  const selectMyTabHandler = async () => {
    // my tab 클릭시
    await getMyItemList();
    setCurrentTab(1);
  };

  const onCartHandler = () => {
    setIsCartOpen((pre) => !pre);
  };

  const exitModal = () => {
    setIsExit(false);
  };

  // item tab 으로 넘겨줄 현재 카테고리의 아이템 리스트 반환
  const currentItemListHandler = () => {
    const tab = curCategory as keyof SelectedItemProps;
    let returnItemList: ItemProps[] = [];
    if (currentTab == 0) {
      returnItemList = itemList[tab];
    } else {
      returnItemList = myItemList[tab];
    }
    return returnItemList;
  };

  // selected list 에 있는 item 인지 확인해서 item의 click state 반환
  const checkItemHandler = (item: ItemProps) => {
    const tab = curCategory as keyof SelectedItemProps;
    if (Array.isArray(selectedItemList[tab])) {
      return (selectedItemList[tab] as ItemProps[]).some((value) => value.id === item.id);
    } else {
      return (selectedItemList[tab] as ItemProps).id === item.id;
    }
  };

  const filterItem = async () => {
    const newItemList: SelectedItemProps = await resetItem();
    setSelectedItemList(newItemList);
    exitStoreHandler();
  };

  const exitStoreHandler = () => {
    // 입은 옷 저장 api

    if (selectedItemList) {
      const acc: number[] = [1];
      selectedItemList.accessories.map((item) => acc.push(item.id));

      const wearItemId: wearReqType = {
        hatId: selectedItemList.hat.id,
        topId: selectedItemList.top.id,
        bottomId: selectedItemList.bottom.id,
        shoeId: selectedItemList.shoe.id,
        backgroundId: selectedItemList.background.id,
        accessories: acc,
      };

      itemApi.wearItemReq(wearItemId).then(() => {
        setQookie({ ...qookie, ...selectedItemList });
        navigate('/mypage');
      });
    }
  };

  return (
    <PageContainer>
      <TopContainer>
        {selectedItemList.background.media && (
          <BackgroundImg src={selectedItemList?.background.media} alt="bg" />
        )}
        <QookieContainer>
          <Qookie {...showQookie} />
        </QookieContainer>
        <ButtonContainer>
          <Chip type="qoin" text={`${curQoin}`} size="big" />
          <Button
            theme={checkItemToBuy().length > 0 ? 'default' : 'disabled'}
            size="icon"
            onClick={onCartHandler}
          >
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
            onClick={selectAllTabHandler}
          >
            상점
          </Title>
          <Title
            typography="title"
            color={currentTab !== 1 ? 'var(--MR_GRAY1)' : 'var(--MR_BLACK)'}
            onClick={selectMyTabHandler}
          >
            MY
          </Title>
        </TitleTab>
        <TabContainer ref={tabSwipeRef}>
          {Object.entries(categoryTab).map(([key, value]) => (
            <IconContainer
              key={key}
              current={curCategory === key}
              onClick={() => setCurCategory(key)}
            >
              {value}
            </IconContainer>
          ))}
        </TabContainer>
        <ItemTab
          curCategory={curCategory}
          tabItemProps={currentItemListHandler}
          handleCheck={changeSelectItemHandler}
          isCheck={checkItemHandler}
        />
      </BottomContainer>
      <BottomSheet
        isOpen={isCartOpen}
        title={'장바구니'}
        onClose={onCartHandler}
        children={
          <Cart
            totalList={checkItemToBuy()}
            onClose={onCartHandler}
            isComplete={handleCompleteBuy}
            curQoin={curQoin}
          />
        }
      />
      <Dialog
        title="장착한 아이템이 사라져요"
        content={`구매하지 않은 장착 아이템은 저장되지 않아요 \n구매하지 않고 나가시겠어요?`}
        negative="구매하기"
        onNegativeClick={onCartHandler}
        positive="나가기"
        onPositiveClick={filterItem}
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QookieContainer = styled.div`
  position: absolute;
`;

const BackgroundImg = styled.img`
  width: 100%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  bottom: 0;
  padding: 0 1rem 1rem 1rem;
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
