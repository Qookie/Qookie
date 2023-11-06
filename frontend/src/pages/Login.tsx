import {
  signInWithRedirect,
  GoogleAuthProvider,
  OAuthProvider,
} from 'firebase/auth';
import styled, { keyframes } from 'styled-components';

import CookieGrow from '../assets/pngs/CookieGrow.png';
import SocialLoginButton, {
  Social,
  socialLogin,
} from '../components/login/atoms/SocialLoginButton';
import TitleLayout from '../components/shared/Template/TitleLayout';
import { useNavigate } from 'react-router-dom';

const provider = {
  kakao: new OAuthProvider('oidc.kakao'),
  google: new GoogleAuthProvider(),
};

const Login = () => {
  const navigate = useNavigate();

  const onClickSocialLogin = (provider: OAuthProvider | GoogleAuthProvider) => {
    navigate('/loading?provider=' + provider.providerId);
  };

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
