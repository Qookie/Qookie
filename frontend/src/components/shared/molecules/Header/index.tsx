import styled from 'styled-components';
import { ChevronLeftIcon, BellIcon } from '@heroicons/react/24/outline';
import { ReactComponent as LogoCoin } from '../../../../assets/coin.svg';
import { useNavigate } from 'react-router-dom';
import Text from '../../atoms/Text';

export interface HeaderProps {
  page: string;
  title?: string;
}

export default function Header({ page, title }: HeaderProps) {
  const navigate = useNavigate();

  const movePrevPage = () => {
    navigate(-1);
  };

  const headerType = (page: string) => {
    switch (page) {
      case 'none':
        return;
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

  return <HeaderContainer page={page}>{headerType(page)}</HeaderContainer>;
}

const HeaderContainer = styled.div<HeaderProps>`
  width: 100%;
  height: 4rem;
  position: fixed;
  background-color: ${({ page }) => (page != 'home' ? 'var(--MR_WHITE)' : 'transparent')};
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
