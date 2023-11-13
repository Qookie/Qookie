import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { auth } from '../../../../firebase/firebaseConfig';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../../../../modules/user';
import Dialog from '../../../shared/molecules/Dialog';
import { useState } from 'react';

interface Props {
  icon?: React.ReactNode;
  intro: string;
  path: string;
}

export default function MypageListItem({ icon, intro, path }: Props) {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(UserState);
  const [dialogState, setDialogState] = useState(false);

  const navigateHandler = () => {
    // logout
    if (path === 'logout') {
      setDialogState(true);
    } else {
      navigate(`/${path}`);
    }
  };

  const doSignOut = () => {
    signOut(auth).then(() => {
      setUserState(null);
      navigate('/');
    });
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
