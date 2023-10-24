import * as S from './index.styled';
import { HomeIcon, CalendarIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/20/solid';

export default function NavBar() {
  return (
    <S.NavContainer>
      <S.NavItem to={'/home'}>
        <HomeIcon />
        <S.NavName>홈</S.NavName>
      </S.NavItem>
      <S.NavItem to={'/calendar'}>
        <CalendarIcon />
        <S.NavName>캘린더</S.NavName>
      </S.NavItem>
      <S.NavItem to={'/mind'}>
        <EnvelopeIcon />
        <S.NavName>마음함</S.NavName>
      </S.NavItem>
      <S.NavItem to={'/mypage'}>
        <UserIcon />
        <S.NavName>마이페이지</S.NavName>
      </S.NavItem>
    </S.NavContainer>
  );
}