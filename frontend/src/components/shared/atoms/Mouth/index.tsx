import styled from 'styled-components';
import { Mouth1 } from '../../../../assets/svgs';

export default function Mouth() {
  return (
    <Container>
      <Mouth1 />
    </Container>
  );
}

const Container = styled.div`
  z-index: 1;
  position: absolute;
  top: 63%;
  left: 60%;
  transform: translate(-63%, -60%);
`;
