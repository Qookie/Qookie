import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from '@firebase/auth';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../recoil/UserState';

export default function NotFound() {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(UserState);
  // logout
  const logout = () => {
    signOut(auth).then(() => {
      setUserState(null);
      navigate('/');
    });
  };
  return (
    <>
      <div>404 NOT FOUND / CHECK YOUR LOGIN STATUS</div>
      <Link to="/home">to home</Link>
      <div onClick={logout}>CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT</div>
    </>
  );
}
