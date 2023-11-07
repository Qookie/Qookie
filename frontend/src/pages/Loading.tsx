import { getRedirectResult, getIdToken, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { http } from '../api/instance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/shared/atoms/Spinner';
import { OAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../recoil/UserState';

type LoginResponse = {
  msg: string;
  payload: {
    name: string;
    email: string;
    new: boolean;
  };
};

const providers = {
  'oidc.kakao': new OAuthProvider('oidc.kakao'),
  'google.com': new GoogleAuthProvider(),
};

const Loading = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setUserState = useSetRecoilState(UserState);

  const socialLoginCallback = async () => {
    console.log('0');
    const provider = searchParams.get('provider');
    searchParams.delete('provider');
    setSearchParams();
    console.log('1');
    if (provider === 'oidc.kakao') {
      signInWithRedirect(auth, providers[provider]);
      console.log('2');
    } else if (provider === 'google.com') {
      signInWithRedirect(auth, providers[provider]);
      console.log('2');
    }
  };

  useEffect(() => {
    socialLoginCallback();
    getRedirectResult(auth).then((res) => {
      console.log('A');
      if (res === null) {
        return;
      }
      console.log('B');
      const { user } = res;

      const copiedUser = JSON.parse(JSON.stringify(user));
      setUserState(copiedUser);

      user
        .getIdToken()
        .then((accessToken) => {
          console.log('C');
          localStorage.setItem('accessToken', accessToken);
          const { displayName, email, uid } = user;
          http
            .post<LoginResponse>('/api/member/login', {
              displayName,
              email,
              uid,
              messageToken: localStorage.getItem('messageToken'),
            })
            .then((res) => {
              console.log('D');
              if (res.payload.new) {
                navigate('/init');
              } else {
                navigate('/home');
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return <Spinner />;
};

export default Loading;
