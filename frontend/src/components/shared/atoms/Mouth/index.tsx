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
  position: absolute;
  top: 64%;
  left: 64%;
  transform: translate(-64%, -64%);
`;
