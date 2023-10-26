import styled from 'styled-components';
import { Eye1 } from '../../../../assets/svgs';

export default function Eye() {
  return (
    <Container>
      <Eye1 />
    </Container>
  );
}

const Container = styled.div`
  z-index: 1;
  position: absolute;
  top: 56%;
  left: 60%;
  transform: translate(-56%, -60%);
`;
