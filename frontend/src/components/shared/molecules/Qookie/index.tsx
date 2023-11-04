import styled from 'styled-components';
import { QookieInfo } from '../../../../types';

export default function Qookie({ ...props }: QookieInfo) {
  return (
    <DoughContainer body={props.body}>
      <EyeContainer eye={props.eye} />
      <MouthContainer mouth={props.mouth} />
    </DoughContainer>
  );
}

const DoughContainer = styled.div<{ body: string }>`
  background: center/contain no-repeat url(${(props) => props.body});
  height: 319px;
  width: 415px;
  transform: scale(0.5);
  position: relative;
`;

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
