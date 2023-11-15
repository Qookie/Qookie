import { signInWithRedirect, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import styled, { keyframes } from 'styled-components';

import CookieGrow from '../assets/pngs/CookieGrow.png';
import SocialLoginButton, {
  Social,
  socialLogin,
} from '../components/login/atoms/SocialLoginButton';
import TitleLayout from '../components/shared/Template/TitleLayout';
import { useNavigate } from 'react-router-dom';
import Dialog from '../components/shared/molecules/Dialog';
import { useEffect, useState } from 'react';
import initiateFirebaseMessaging from '../firebase/firebaseMessaging';

const provider = {
  kakao: new OAuthProvider('oidc.kakao'),
  google: new GoogleAuthProvider(),
};

const Login = () => {
  const navigate = useNavigate();
  const [dialogState, setDialogState] = useState<boolean>(false);

  const onClickSocialLogin = (provider: OAuthProvider | GoogleAuthProvider) => {
    navigate('/loading?provider=' + provider.providerId);
  };

  const dialogHandler = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation();
      alert('언제든 마이페이지에서 알림을 설정할 수 있어요!');
      setDialogState((dialogState) => !dialogState);
    }
  };

  const notifi = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    initiateFirebaseMessaging();
    setDialogState(false);
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      setDialogState(true);
    }
  }, []);

  return (
    <TitleLayout
      title={'Qookie처럼\n단단해지는 내 마음'}
      desc={'구레잇한 당신의 삶을 위해\nQookie를 시작해보세요'}
    >
      <CookieSlide />
      <ButtonContainer>
        {socialLogin.map((social: Social) => (
          <SocialLoginButton
            key={social}
            social={social}
            onClick={() => onClickSocialLogin(provider[social])}
          />
        ))}
      </ButtonContainer>
      <Dialog
        title={'알림을 허용해 주세요!'}
        content={'쿠키 서비스를 전부 사용하기 위해서는 알림 권한이 필요해요.'}
        negative={'아니요'}
        onNegativeClick={dialogHandler}
        positive={'네'}
        onPositiveClick={notifi}
        isopen={dialogState}
        onCloseRequest={dialogHandler}
      />
    </TitleLayout>
  );
};

const move = keyframes`
  0% {
    background-position: 0 center;
  }

  100% {
    background-position: 200% center;
  }
`;

const CookieSlide = styled.div`
  width: 100%;
  height: min(28vh, 332px);
  margin-bottom: 9vh;
  background: url(${CookieGrow}) 0 center / 200% repeat-x;
  animation: ${move} 15s linear infinite;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
  margin-bottom: 10vh;
`;

export default Login;
