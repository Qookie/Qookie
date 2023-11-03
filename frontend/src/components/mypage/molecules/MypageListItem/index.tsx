import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Badge, Deco, MyQookie, QoinList } from '../../../../assets/svgs';
import { useNavigate } from 'react-router-dom';

export const mypageList = [
  'deco',
  'badge',
  'myQookie',
  'qoin',
  'info',
  'notice',
  'privacy',
  'logOut',
  'withDraw',
] as const;
export type Mypage = (typeof mypageList)[number];

interface Props {
  mypage: Mypage;
}

export default function MypageListItem({ mypage }: Props) {
  const { icon, intro } = MYPAGE_ITEM[mypage];
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/${mypage}`);
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

const MYPAGE_ITEM = {
  deco: {
    icon: <Deco />,
    intro: '쿠키 꾸미기',
  },
  badge: {
    icon: <Badge />,
    intro: '나의 배지',
  },
  myQookie: {
    icon: <MyQookie />,
    intro: '내가 만든 쿠키',
  },
  qoin: {
    icon: <QoinList />,
    intro: '코인 내역',
  },
  info: {
    icon: '',
    intro: '회원 정보',
  },
  notice: {
    icon: '',
    intro: '공지사항',
  },
  privacy: {
    icon: '',
    intro: '개인정보처리방침',
  },
  logOut: {
    icon: '',
    intro: '로그아웃',
  },
  withDraw: {
    icon: '',
    intro: '회원 탈퇴',
  },
};

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
