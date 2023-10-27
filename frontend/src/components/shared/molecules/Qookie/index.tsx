import styled from 'styled-components';
import { QookieInfo } from '../../../../types';

export default function Qookie({ ...props }: QookieInfo) {
  return (
    <QookieContainer>
      <BackgroundContainer>
        <Image src={props.background} alt="bg" />
        <OverlayGradient />
        <DoughContainer>
          <Image src={props.body} alt="dough" />
          <EyeContainer>
            <Image src={props.eye} alt="eye" />
            <MouthContainer>
              <Image src={props.mouth} alt="mouth" />
            </MouthContainer>
          </EyeContainer>
        </DoughContainer>
      </BackgroundContainer>
    </QookieContainer>
  );
}

const QookieContainer = styled.div`
  display: flex;
`;
const BackgroundContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const OverlayGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 20%);
`;

const DoughContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EyeContainer = styled.div`
  position: absolute;
  top: 38%;
  left: 68%;
  transform: translate(-50%, -50%);
`;

const MouthContainer = styled.div`
  position: absolute;
  top: 120%;
  left: 54%;
  transform: translate(-50%, -50%);
`;
