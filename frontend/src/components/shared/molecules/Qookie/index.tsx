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
          {props.bottom.media && (
            <BottomContainer src={props.bottom.media} level={props.level} alt="bottom" />
          )}
          {props.hat.media && <HatContainer src={props.hat.media} alt="hat" level={props.level} />}
          {props.shoe.media && (
            <ShoeContainer src={props.shoe.media} level={props.level} alt="shoe" />
          )}
          {props.top.media && <TopContainer src={props.top.media} alt="top" />}
          {props.accessories &&
            props.accessories.map(
              (acc, index) => acc.media && <AccContainer key={index} src={acc.media} alt="acc" />,
            )}
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
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  transform: translateX(-50%);
  ${({ level }) => hatPosition(level)};
`;

const hatPosition = (level: number) => {
  switch (true) {
    case level >= 40:
      return `top: -35%; left: 50%`;
    case level >= 30:
      return `top: -35%; left: 51%`;
    case level >= 20:
      return `top: -44%; left: 49%`;
    default:
      return `top: -60%; left: 47%`;
  }
};

const TopContainer = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const BottomContainer = styled.img<{ level: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ level }) => (level >= 40 ? '44%' : '43%')};
  transform: translateX(-50%);
`;

const ShoeContainer = styled.img<{ level: number }>`
  position: absolute;
  bottom: -2%;
  left: ${({ level }) => (level >= 40 ? '42%' : level >= 30 ? '40%' : '43%')};
  transform: translateX(-50%);
`;

const AccContainer = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(-50%, -50%);
`;
