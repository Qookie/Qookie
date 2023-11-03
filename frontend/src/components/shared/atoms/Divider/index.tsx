import styled from 'styled-components';

export default function Divider() {
  return <HrContainer></HrContainer>;
}

const HrContainer = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: rgba(224, 224, 224, 0.25);
  margin: 1rem 0;
`;
