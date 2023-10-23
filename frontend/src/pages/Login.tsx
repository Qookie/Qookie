import {
  signInWithRedirect,
  GoogleAuthProvider,
  OAuthProvider,
  getRedirectResult,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useEffect } from 'react';

const Login = () => {
  const googleLogin = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
    console.log('googlelogin');
  };
  const kakaoLogin = () => {
    const provider = new OAuthProvider('oidc.kakao');
    signInWithRedirect(auth, provider);
    console.log('kakaologin');
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((res) => {
        console.log('RES', res);
        // send accessToken, refreshToken, uid to backend
      })
      .catch((err) => {
        console.log('ERR', err);
      });
  });

  return (
    <>
      <img src="/google.png" alt="googleLogin" onClick={googleLogin} />
      <img src="/kakao.png" alt="kakaoLogin" onClick={kakaoLogin} />
    </>
  );
};

export default Login;
