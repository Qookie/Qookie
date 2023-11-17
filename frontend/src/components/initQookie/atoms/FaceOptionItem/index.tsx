import styled from 'styled-components';

interface Props {
  selected: boolean;
}

const FaceOptionItem = styled.button<Props>`
  width: 4.625rem;
  height: 4.625rem;
  border: ${({ selected }) => (selected ? '1px solid var(--MR_RED)' : '1px solid var(--MR_GRAY1)')};
  border-radius: 12px;
  background-color: transparent;
  margin-bottom: 1rem;
`;

export default FaceOptionItem;
