import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from '@firebase/auth';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../modules/user';
import Error from '../components/shared/atoms/error';
import Button from '../components/shared/atoms/Button';
import styled from 'styled-components';
import TitleLayout from '../components/shared/Template/TitleLayout';

export default function NotFound() {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(UserState);
  // logout
  const logout = () => {
    signOut(auth).then(() => {
      setUserState(null);
      localStorage.removeItem('messageToken');
      navigate('/');
    });
  };
  return (
    <TitleLayout
      title="Not Found"
      desc={'로그인 상태를 확인해주세요'}
      children={
        <Container>
          <Error children="404 NOT FOUND" />
          <Button theme="transparent" onClick={() => navigate('/home')}>
            홈으로
          </Button>
          <Button theme="default" onClick={logout}>
            로그아웃
          </Button>
        </Container>
      }
    />
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  margin-top: 4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
