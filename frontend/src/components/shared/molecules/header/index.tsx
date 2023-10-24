import styled from 'styled-components';
import { ChevronLeftIcon, BellIcon } from '@heroicons/react/24/outline';
import { ReactComponent as LogoCoin } from '../../../../assets/coin.svg';

export interface HeaderProps {
  page: string;
}

export default function Header({ page }: HeaderProps) {
  const headerType = (page: string) => {
    switch (page) {
      case 'home':
        return (
          <HomeContainer>
            <HeaderIcon>
              <LogoCoin style={{ width: '100%', height: '100%' }} />
            </HeaderIcon>
            <HeaderIcon>
              <BellIcon />
            </HeaderIcon>
          </HomeContainer>
        );
      case '캘린더':
      case '마음함':
      case '마이페이지':
        return <TitleContainer>{page}</TitleContainer>;
      default:
        return (
          <TitleContainer>
            <HeaderIcon>
              <ChevronLeftIcon />
            </HeaderIcon>
          </TitleContainer>
        );
    }
  };

  return <HeaderContainer>{headerType(page)}</HeaderContainer>;
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 4rem;
  position: fixed;
  background-color: var(--MR_WHITE);
  z-index: 5;
`;

const HomeContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.75rem;
  padding: 0 1rem;
`;

const TitleContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-weight: 700;
  font-family: inherit;
  font-size: inherit;
`;

const HeaderIcon = styled.div`
  width: 1.4rem;
  height: 1.4rem;
`;
