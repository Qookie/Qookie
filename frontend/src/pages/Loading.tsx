import {
  getRedirectResult,
  getIdToken,
  signInWithRedirect,
  User,
  UserCredential,
  deleteUser,
  signOut,
  Auth,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { http } from '../api/instance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/shared/atoms/Spinner';
import { OAuthProvider, GoogleAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
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

  const doSignOut = (auth: Auth) => {
    signOut(auth).then(() => {
      setUserState(null);
      navigate('/');
    });
  };

  const socialLoginCallback = async () => {
    const provider = searchParams.get('provider');
    searchParams.delete('provider');
    setSearchParams(searchParams);
    if (provider === 'oidc.kakao') {
      signInWithRedirect(auth, providers[provider]);
    } else if (provider === 'google.com') {
      signInWithRedirect(auth, providers[provider]);
    }
  };

  const signIn = (res: UserCredential) => {
    const { user } = res;
    const copiedUser = JSON.parse(JSON.stringify(user));
    setUserState(copiedUser);
    user
      .getIdToken()
      .then((accessToken) => {
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
            if (res.payload.new) {
              navigate('/init');
            } else {
              navigate('/home');
            }
          })
          .catch((err) => {
            console.log('ERROR AT BACKEND WHILE LOGIN', err);
          });
      })
      .catch((err) => console.log(err));
  };

  const withdraw = async (res: UserCredential) => {
    const currentUser = res.user;
    const credential = OAuthProvider.credentialFromResult(res);
    if (!credential) {
      return;
    }
    const newCredential = await reauthenticateWithCredential(currentUser, credential);
    const uidBefore = searchParams.get('uid');

    if (uidBefore !== newCredential.user.providerData[0].uid) {
      alert(
        '탈퇴하려는 정보와 기존 로그인 정보가 일치하지 않습니다!\n개인정보 보호를 위해 로그아웃 됩니다.\n다시 로그인 해 주세요',
      );
      doSignOut(auth);
      navigate('/');
      return;
    }

    try {
      await deleteUser(newCredential.user);
      await http.patch('/api/member/delete');
      alert('회원 탈퇴 성공!');
      doSignOut(auth);
      navigate('/');
    } catch (err) {
      alert(
        '회원 탈퇴 실패!\n' +
          err +
          '\n개인정보 보호를 위해 로그아웃 됩니다.\n다시 로그인 해 주세요',
      );
      doSignOut(auth);
      navigate('/');
    }
  };

  useEffect(() => {
    socialLoginCallback();
    getRedirectResult(auth).then((res) => {
      if (res === null) {
        return;
      }
      if (searchParams.get('withdraw') === 'true') {
        withdraw(res);
      } else {
        signIn(res);
      }
    });
  }, []);

  return <Spinner />;
};

export default Loading;
