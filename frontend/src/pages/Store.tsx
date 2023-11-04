import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import Qookie from '../components/shared/molecules/Qookie';
import Button from '../components/shared/atoms/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Title from '../components/shared/atoms/Title';

export default function Store() {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);

  return (
    <HomeContainer>
      <QookieContainer>
        <BackgroundImg src={qookie.background} alt="bg" />
        <Qookie {...qookie} />
        <ButtonContainer>
          <Button theme={'disabled'} size="icon">
            <ShoppingCartIcon width={20} height={20} />
            구매
          </Button>
        </ButtonContainer>
      </QookieContainer>
      <BottomContainer>
        <TitleTab>
          <Title typography="title">상점</Title>
          <Title typography="title" color="var(--MR_GRAY1)">
            MY
          </Title>
        </TitleTab>
      </BottomContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;

const QookieContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
`;

const ButtonContainer = styled.div`
  position: relative;
  margin-left: auto;
  padding: 0 1rem 1rem 0;
  margin-top: -2rem;
`;

const BottomContainer = styled.div`
  padding: 1.5rem 1rem 0rem 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const TitleTab = styled.div`
  display: flex;
  gap: 1.3rem;
`;
