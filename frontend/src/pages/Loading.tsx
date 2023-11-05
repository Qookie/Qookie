import { getRedirectResult, getIdToken, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { http } from '../api/instance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/shared/atoms/Spinner';
import { OAuthProvider, GoogleAuthProvider } from 'firebase/auth';

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
  const [searchParams, _] = useSearchParams();

  const socialLoginCallback = async () => {
    const provider = searchParams.get('provider');

    if (provider === 'oidc.kakao') {
      signInWithRedirect(auth, providers[provider]);
    } else if (provider === 'google.com') {
      signInWithRedirect(auth, providers[provider]);
    }

    const res = await getRedirectResult(auth);

    if (!res) {
      return;
    }

    const { user } = res;
    const accessToken = await getIdToken(user);
    localStorage.setItem('accessToken', accessToken);
    const { displayName, email, uid } = user;

    try {
      const res = await http.post<LoginResponse>('/api/member/login', {
        displayName,
        email,
        uid,
        messageToken: localStorage.getItem('messageToken'),
      });

      if (res.payload.new) {
        navigate('/init');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // redirect to home if user is signed-in
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home');
      } else {
        socialLoginCallback();
      }
    });
  });

  return <Spinner />;
};

export default Loading;
