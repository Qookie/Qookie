import styled from 'styled-components';
import { QookieInfo } from '../../../../types';
import StatusCard from '../StatusCard';
import Qookie from '../../molecules/Qookie';

export default function QookieStatus({ ...props }: QookieInfo) {
  return (
    <QookieContainer>
      <BackgroundContainer
        background={
          props.background.media
            ? props.background.media
            : 'https://bangle.s3.ap-northeast-2.amazonaws.com/f7db6e44-ad5b-4d22-a60e-ad9bfd0737c4.png'
        }
      >
        <Qookie {...props} />
      </BackgroundContainer>
      <ContentsWrapper>
        <StatusCard {...props} />
      </ContentsWrapper>
    </QookieContainer>
  );
}

const QookieContainer = styled.div`
  position: relative;
`;

const BackgroundContainer = styled.div<{ background: string }>`
  background:
    linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 20%),
    center/cover no-repeat url(${(props) => props.background});
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 25rem;
`;
