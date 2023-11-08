import styled from 'styled-components';
import Text from '../components/shared/atoms/Text';
import QookieStatus from '../components/shared/organisms/QookieStatus';
import { useRecoilValue } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import Money from '../components/coinlist/molecules/Money';
import Button from '../components/shared/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useState } from 'react';
import Dialog from '../components/shared/molecules/Dialog';
import { http } from '../api/instance';

export default function Withdraw() {
  const [dialogState, setDialogState] = useState(false);
  const navigate = useNavigate();
  const qookie = useRecoilValue(QookieInfoState);
  // TODO: add crying eye item
  // const cryingQookieProp = { ...qookie, background: '', eye: '여기에 우는 아이템 url' };
  const cryingQookieProp = { ...qookie, background: '' };

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

  return (
    <WithdrawContainer>
      <TitleContainer>
        <Text typography="title">탈퇴하기</Text>
        <Text typography="weak" color="gray">
          {' '}
          탈퇴시 모든 데이터가 사라집니다.
        </Text>
      </TitleContainer>
      <QookieStatus {...cryingQookieProp} />
      <Money MoneyTheme="disabled"></Money>
      <ButtonContainer>
        <Button size="medium" theme="transparent" onClick={dialogHandler}>
          탈퇴하기
        </Button>
        <Button size="medium" theme="default" onClick={cancel}>
          취소
        </Button>
      </ButtonContainer>
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
    </WithdrawContainer>
  );
}

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10vh;
  padding: 0 2vh 0;
`;

const TitleContainer = styled.div`
  margin-bottom: -4vh;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
