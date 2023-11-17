import styled from 'styled-components';
import NotFound from '../../../../assets/pngs/NotFound.png';

interface Props {
  children: string;
}

export default function Error({ children }: Props) {
  return (
    <ImgContainer>
      <img src={NotFound} alt="not found" width={140} />
      <TextContainer>{children}</TextContainer>
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  bottom: 0;
  padding: 1.5rem;
  color: var(--MR_GRAY2);
`;
