import styled from 'styled-components';

function Spinner() {
  return (
    <Container>
      <img src="loading.gif" alt="loading.gif" />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Spinner;
