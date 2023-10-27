import {
  signInWithRedirect,
  GoogleAuthProvider,
  OAuthProvider,
  getRedirectResult,
  getIdToken,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useEffect } from 'react';
import Text from '../components/shared/atoms/Text';
import styled, { keyframes } from 'styled-components';

import CookieGrow from '../assets/pngs/CookieGrow.png';
import Title from '../components/login/atoms/Title';
import SocialLoginButton, {
  Social,
  socialLogin,
} from '../components/login/atoms/SocialLoginButton';
import { http } from '../api/instance';

const provider = {
  kakao: new OAuthProvider('oidc.kakao'),
  google: new GoogleAuthProvider(),
};

const Login = () => {
  const onClickSocialLogin = (provider: OAuthProvider | GoogleAuthProvider) => {
    signInWithRedirect(auth, provider);
  };

  const socialLoginCallback = async () => {
    const res = await getRedirectResult(auth);

    if (!res) {
      return;
    }

    const { user } = res;
    const accessToken = await getIdToken(user);
    localStorage.setItem('accessToken', accessToken);
    console.log('accessToken', accessToken);
    
    const { displayName, email, uid } = user;

    try {
      http.post('/api/member/login', {
        displayName,
        email,
        uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socialLoginCallback();
  });

  return (
    <>
      <Top>
        <Title typography="title">
          Qookie처럼
          <br /> 단단해지는 내 마음
        </Title>
        <Text>
          구레잇한 당신의 삶을 위해
          <br />
          Qookie를 시작해보세요
        </Text>
      </Top>

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
    </>
  );
};

const Top = styled.div`
  margin-top: 7vh;
  padding: 0 1rem;
  margin-bottom: 8vh;
`;

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
