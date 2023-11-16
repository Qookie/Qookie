import styled from 'styled-components';
import Text from '../components/shared/atoms/Text';
import QookieStatus from '../components/shared/organisms/QookieStatus';
import { useRecoilValue } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import Money from '../components/coinlist/molecules/Money';
import Button from '../components/shared/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import Dialog from '../components/shared/molecules/Dialog';
import TitleLayout from '../components/shared/Template/TitleLayout';
import qoin from '../api/qoin';

export default function Withdraw() {
  const [curCoin, setCurCoin] = useState(0);
  const [dialogState, setDialogState] = useState(false);
  const navigate = useNavigate();
  const qookie = useRecoilValue(QookieInfoState);

  const doWithdraw = async () => {
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }
    const providerId = currentUser.providerData[0].providerId;
    const uid = currentUser.providerData[0].uid;
    alert('회원 탈퇴를 위해서 본인 인증이 필요합니다.');
    navigate(`/loading?provider=${providerId}&uid=${uid}&withdraw=true`);
  };

  const cancel = () => {
    navigate(-1);
  };

  const dialogHandler = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation();
      setDialogState((dialogState) => !dialogState);
    }
  };

  useEffect(() => {
    qoin.getQoinList().then((c) => {
      if (c !== undefined) {
        setCurCoin(c);
      }
    });
  }, []);

  return (
    <>
      <Dialog
        title={'탈퇴를 진행할까요?'}
        content={'탈퇴시 모든 데이터가 사라집니다.'}
        negative={'아니요'}
        onNegativeClick={dialogHandler}
        positive={'네'}
        onPositiveClick={doWithdraw}
        isopen={dialogState}
        onCloseRequest={dialogHandler}
      />
      <TitleLayout
        title="탈퇴하기"
        desc="탈퇴시 모든 데이터가 사라집니다."
        children={
          <ChildrenContainer>
            <QookieStatus {...qookie} />
            <MonneyContainer>
              <Money MoneyTheme="disabled" qoin={curCoin}></Money>
            </MonneyContainer>
            <ButtonContainer>
              <Button size="medium" themes="transparent" onClick={dialogHandler}>
                탈퇴하기
              </Button>
              <Button size="medium" themes="default" onClick={cancel}>
                취소
              </Button>
            </ButtonContainer>
          </ChildrenContainer>
        }
      ></TitleLayout>
    </>
  );
}

const ChildrenContainer = styled.div`
  margin-top: -3rem;
`;

const MonneyContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
