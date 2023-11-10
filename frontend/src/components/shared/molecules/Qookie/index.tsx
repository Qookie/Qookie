import styled from 'styled-components';
import { QookieInfo } from '../../../../types';

export default function Qookie({ ...props }: QookieInfo) {
  return (
    <>
      {props.level > 0 && (
        <Container>
          <DoughContainer src={props.body} alt="body" />
          <EyeContainer src={props.eye} alt="eye" />
          <MouthContainer src={props.mouth} alt="mouth" />
          {props.level >= 5 && props.level < 10 && (
            <BagContainer>
              <BagImg src={props.extraBody} alt="bag" />
            </BagContainer>
          )}
          {props.hat && <HatContainer src={props.hat.media} alt="hat" level={props.level} />}
          {props.shoe && <ShoeContainer src={props.shoe.media} alt="shoe" />}
          {props.bottom && <BottomContainer src={props.bottom.media} alt="bottom" />}
          {props.top && <TopContainer src={props.top.media} alt="top" />}
          {props.accessories &&
            props.accessories.map((acc, index) => (
              <AccContainer key={index} src={acc.media} alt="acc" />
            ))}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
  transform: scale(0.4);
`;

const DoughContainer = styled.img`
  width: auto;
  height: auto;
`;

const BagContainer = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.4);
`;

const BagImg = styled.img``;

const EyeContainer = styled.img`
  position: absolute;
  top: 0;
  left: 62%;
  transform: translateX(-50%);
`;

const MouthContainer = styled.img`
  position: absolute;
  top: 0;
  left: 62%;
  transform: translateX(-50%);
`;

const HatContainer = styled.img<{ level: number }>`
  position: absolute;
  top: ${({ level }) => (level < 30 ? '-40%' : '-28%')};
  left: 50%;
  transform: translateX(-50%);
`;

const TopContainer = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const BottomContainer = styled.img`
  position: absolute;
  bottom: 0;
  left: 44%;
  transform: translateX(-50%);
`;

const ShoeContainer = styled.img`
  position: absolute;
  top: 100%;
  left: 43.5%;
  transform: translateX(-50%);
`;

const AccContainer = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-50%, -50%);
`;
