import { getRedirectResult, getIdToken, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { http } from '../api/instance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/shared/atoms/Spinner';
import { OAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../modules/user';

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
    const provider = searchParams.get('provider');
    searchParams.delete('provider')
    setSearchParams()
    if (provider === 'oidc.kakao') {
      signInWithRedirect(auth, providers[provider]);
    } else if (provider === 'google.com') {
      signInWithRedirect(auth, providers[provider]);
    }
  };

  useEffect(() => {
    socialLoginCallback()
    getRedirectResult(auth)
      .then((res) => {
        if (res === null) {
          return
        }
        const { user } = res;

        const copiedUser = JSON.parse(JSON.stringify(user))
        setUserState(copiedUser);
        
        user.getIdToken()
          .then((accessToken) => {
            localStorage.setItem("accessToken", accessToken)
            const { displayName, email, uid } = user;
            http.post<LoginResponse>('/api/member/login', {
              displayName,
              email,
              uid,
              messageToken: localStorage.getItem('messageToken')
            })
              .then((res) => {
                if (res.payload.new) {
                  navigate('/init')
                } else {
                  navigate('/home')
                }
              })
              .catch(err=>console.log(err))
            
          })
          .catch(err=>console.log(err))
      })
  }, [])


  return <Spinner />;
};

export default Loading;
