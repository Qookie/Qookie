import { getRedirectResult, getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { http } from '../api/instance';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/shared/atoms/Spinner';
import initiateFirebaseMessaging from '../firebase/firebaseMessaging';

type LoginResponse = {
  msg: string;
  payload: {
    name: string;
    email: string;
    new: boolean;
  };
};

const Loading = () => {
  const navigate = useNavigate();
  const socialLoginCallback = async () => {
    const res = await getRedirectResult(auth);
    const messageToken = await initiateFirebaseMessaging()

    if (!res || messageToken === "") {
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
        messageToken: messageToken,
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

  useEffect(() => {
    socialLoginCallback();
  });

  return <Spinner />;
};

export default Loading;
