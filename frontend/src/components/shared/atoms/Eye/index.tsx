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
  position: absolute;
  top: 58%;
  left: 64%;
  transform: translate(-58%, -64%);
`;
