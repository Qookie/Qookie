import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import Qookie from '../components/shared/molecules/Qookie';
import Button from '../components/shared/atoms/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Store() {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);

  return (
    <HomeContainer>
      <Qookie {...qookie} />
      <BottomContainer>
        <ButtonContainer>
          <Button theme={'disabled'} size="icon">
            <ShoppingCartIcon width={20} height={20} />
            구매
          </Button>
        </ButtonContainer>
      </BottomContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;

const ButtonContainer = styled.div`
  position: absolute;
  top: -4rem;
  right: 1rem;
`;

const BottomContainer = styled.div`
  padding: 1.5rem 1rem 0rem 1rem;
  background: var(--MR_WHITE);
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
`;
