import styled from 'styled-components';
import { HomeIcon, CalendarIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/20/solid';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <NavContainer>
      <NavItem to={'/home'}>
        <HomeIcon />
        <NavName>홈</NavName>
      </NavItem>
      <NavItem to={'/calendar'}>
        <CalendarIcon />
        <NavName>캘린더</NavName>
      </NavItem>
      <NavItem to={'/mind'}>
        <EnvelopeIcon />
        <NavName>마음함</NavName>
      </NavItem>
      <NavItem to={'/mypage'}>
        <UserIcon />
        <NavName>마이페이지</NavName>
      </NavItem>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 3.4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: var(--MR_WHITE);
  box-shadow: 0px -4px 8px 0px rgba(224, 224, 224, 0.15);
  padding: 1.1rem 0;
  z-index: 5;
`;

const NavItem = styled(NavLink)`
  width: 25%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--MR_GRAY1);
  &.active {
    color: var(--MR_BLACK);
  }
  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const NavName = styled.div`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  margin-top: 0.4rem;
`;
