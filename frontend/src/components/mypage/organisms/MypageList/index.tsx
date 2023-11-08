import styled from 'styled-components';
import MypageListItem from '../../molecules/MypageListItem';
import Divider from '../../../shared/atoms/Divider';
import { Badge, Deco, MyQookie, QoinList } from '../../../../assets/svgs';

export default function MypageList() {
  const qookieSection = [
    {
      icon: <Deco />,
      intro: '쿠키 꾸미기',
      path: 'store',
    },
    {
      icon: <Badge />,
      intro: '나의 배지',
      path: 'badge',
    },
    {
      icon: <MyQookie />,
      intro: '내가 만든 쿠키',
      path: 'myqookie',
    },
    {
      icon: <QoinList />,
      intro: '코인 내역',
      path: 'qoinlist',
    },
  ];

  const userSection = [
    {
      icon: '',
      intro: '회원 정보',
      path: 'info',
    },
    {
      icon: '',
      intro: '공지사항',
      path: 'notice',
    },
    {
      icon: '',
      intro: '개인정보처리방침',
      path: 'privacy',
    },
  ];

  const warnSection = [
    {
      icon: '',
      intro: '로그아웃',
      path: 'logout',
    },
    {
      icon: '',
      intro: '회원 탈퇴',
      path: 'withdraw',
    },
  ];
  return (
    <ListContainer>
      {qookieSection.map((item, index) => (
        <ItemContainer>
          <MypageListItem icon={item.icon} intro={item.intro} path={item.path} key={index} />
        </ItemContainer>
      ))}
      <Divider />
      {userSection.map((item, index) => (
        <ItemContainer>
          <MypageListItem icon={item.icon} intro={item.intro} path={item.path} key={index} />
        </ItemContainer>
      ))}
      <Divider />
      {warnSection.map((item, index) => (
        <ItemContainer>
          <MypageListItem icon={item.icon} intro={item.intro} path={item.path} key={index} />
        </ItemContainer>
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
`;

const ItemContainer = styled.div`
  padding: 1.35rem 1rem;
`;
