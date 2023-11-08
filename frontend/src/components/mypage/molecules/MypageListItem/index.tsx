import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { auth } from '../../../../firebase/firebaseConfig';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../../../../modules/user';

interface Props {
  icon?: React.ReactNode;
  intro: string;
  path: string;
}

export default function MypageListItem({ icon, intro, path }: Props) {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(UserState);

  const navigateHandler = () => {
    // logout
    if (path === 'logout') {
      signOut(auth).then(() => {
        setUserState(null);
        navigate('/');
      });
    } else {
      navigate(`/${path}`);
    }
  };

  return (
    <ItemContainer onClick={navigateHandler}>
      <LeftContainer>
        {icon && <IconContainer>{icon}</IconContainer>}
        <Text typography="button">{intro}</Text>
      </LeftContainer>
      <ChevronRightIcon width={20} />
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-right: 0.5rem;
`;
