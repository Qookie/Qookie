import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { UserState } from "../modules/user";

export default function NotFound() {
  const navigate = useNavigate()
  const setUserState = useSetRecoilState(UserState)
  const logout = () => {
    signOut(auth).then((res) => {
      setUserState(null);
      navigate('/');
      console.log(res)
    })
  }
  return (
    <>
      <div>404 NOT FOUND / CHECK YOUR LOGIN STATUS</div>
			<Link to='/home'>to home</Link>
			<Link to='/home'>to home</Link>
			<Link to='/home'>to home</Link>
      <div onClick={logout}>
        <div>CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT</div>
        <div>CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT</div>
        <div>CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT</div>
        <div>CLICK HERE TO LOGOUT CLICK HERE TO LOGOUT</div>
      </div>
    </>
  );
}
