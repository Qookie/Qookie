import styled from 'styled-components';
import { ChevronLeftIcon, BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Text from '../../atoms/Text';
import { CoinLogo } from '../../../../assets/svgs';
import { useEffect, useState } from 'react';

export interface HeaderProps {
  page: 'home' | 'tab' | 'default';
  title?: string;
}

export default function Header({ page, title }: HeaderProps) {
  const navigate = useNavigate();
  const [homeHeaderColor, setHomeHeaderColor] = useState<string>('transparent');

  const movePrevPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHomeHeaderColor('var(--MR_WHITE)');
      } else {
        setHomeHeaderColor('transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerType = (page: string) => {
    switch (page) {
      case 'home':
        return (
          <HomeContainer>
            <HeaderIcon>
              <CoinLogo />
            </HeaderIcon>
            <HeaderIcon>
              <BellIcon />
            </HeaderIcon>
          </HomeContainer>
        );
      case 'tab':
        return (
          <TitleContainer>
            <Text typography="title" color={'var(--MR_BLACK)'}>
              {title}
            </Text>
          </TitleContainer>
        );
      default:
        return (
          <TitleContainer>
            <HeaderIcon onClick={movePrevPage}>
              <ChevronLeftIcon />
            </HeaderIcon>
          </TitleContainer>
        );
    }
  };

  return (
    <HeaderContainer page={page} backgroundColor={homeHeaderColor}>
      {headerType(page)}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<{ page: string; backgroundColor: string }>`
  width: min(100%, 430px);
  height: 4rem;
  position: fixed;
  background-color: ${({ page, backgroundColor }) =>
    page != 'home' ? 'var(--MR_WHITE)' : backgroundColor};
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
`;

const HeaderIcon = styled.div`
  width: 1.4rem;
  height: 1.4rem;
`;
