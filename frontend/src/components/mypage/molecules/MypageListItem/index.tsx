import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { auth } from '../../../../firebase/firebaseConfig';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { UserState } from '../../../../modules/user';
import Dialog from '../../../shared/molecules/Dialog';
import { useState } from 'react';
import initiateFirebaseMessaging from '../../../../firebase/firebaseMessaging';
import { QookieInfoState } from '../../../../modules/qookie';

export interface MypageItemProps {
  icon?: React.ReactNode;
  intro: string;
  path: string;
}

export default function MypageListItem({ icon, intro, path }: MypageItemProps) {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(UserState);
  const resetList = useResetRecoilState(QookieInfoState);
  const qookie = useRecoilValue(QookieInfoState);
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [storeOpen, setStoreOpen] = useState<boolean>(false);

  const navigateHandler = () => {
    // logout
    if (path === 'logout') {
      setDialogState(true);
    } else if (path === 'notificate') {
      initiateFirebaseMessaging();
    } else if (path === 'store') {
      console.log(qookie);
      if (qookie.level === 0) {
        setStoreOpen(true);
      } else {
        navigate(`/${path}`);
      }
    } else {
      navigate(`/${path}`);
    }
  };

  const doSignOut = () => {
    signOut(auth).then(() => {
      setUserState(null);
      resetList();
      navigate('/');
    });
  };

  const storeOpenHandler = () => {
    setStoreOpen(false);
  };

  const dialogHandler = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation();
      setDialogState((dialogState) => !dialogState);
    }
  };

  return (
    <>
      <ItemContainer onClick={navigateHandler}>
        <LeftContainer>
          {icon && <IconContainer>{icon}</IconContainer>}
          <Text typography="button">{intro}</Text>
        </LeftContainer>
        <ChevronRightIcon width={20} />
      </ItemContainer>
      <Dialog
        title={'쿠키 반죽이 없어요ㅠ'}
        content={'반죽이 있어야 꾸밀 수 있습니다. 반죽을 만들까요?'}
        negative={'만들기'}
        onNegativeClick={() => navigate('/init')}
        positive={'나중에'}
        onPositiveClick={storeOpenHandler}
        isopen={storeOpen}
        onCloseRequest={storeOpenHandler}
      />
      <Dialog
        title={'로그아웃 할까요?'}
        content={'정말 로그아웃 할까요?'}
        negative={'아니요'}
        onNegativeClick={dialogHandler}
        positive={'네'}
        onPositiveClick={doSignOut}
        isopen={dialogState}
        onCloseRequest={dialogHandler}
      />
    </>
  );
}

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.35rem 2rem;
  box-sizing: border-box;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-right: 0.5rem;
`;
