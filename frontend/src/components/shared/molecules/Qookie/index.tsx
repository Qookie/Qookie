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
