import styled from 'styled-components';
import { QookieInfo } from '../../../../types';

export default function Qookie({ ...props }: QookieInfo) {
  return (
    <BackgroundContainer background={props.background}>
      <Container>
        {props.level > 0 && (
          <DoughContainer>
            <DoughImg src={props.body} alt="dough" />
            <EyeContainer eye={props.eye} />
            <MouthContainer mouth={props.mouth} />
          </DoughContainer>
        )}
        {props.level >= 5 && props.level < 10 && (
          <BagContainer>
            <BagImg src={props.extraBody} alt="bag" />
          </BagContainer>
        )}
      </Container>
    </BackgroundContainer>
  );
}

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

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DoughContainer = styled.div`
  transform: scale(0.4);
`;

const BagContainer = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.4);
`;

const DoughImg = styled.img``;

const BagImg = styled.img``;

const EyeContainer = styled.div<{ eye: string }>`
  position: absolute;
  top: 0;
  left: 70%;
  transform: translateX(-50%);
  background: center/contain no-repeat url(${(props) => props.eye});
  width: 67px;
  height: 142px;
`;

const MouthContainer = styled.div<{ mouth: string }>`
  position: absolute;
  top: 0;
  left: 70%;
  transform: translateX(-50%);
  background: center/contain no-repeat url(${(props) => props.mouth});
  width: 67px;
  height: 165px;
`;
