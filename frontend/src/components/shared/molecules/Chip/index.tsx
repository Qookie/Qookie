import styled from 'styled-components';
import { Qoin } from '../../../../assets/svgs';

interface Props {
  type: 'category' | 'qoin';
  icon?: string | React.ReactNode;
  size?: 'default' | 'big';
  text: string | number;
  setInput?: () => void;
  disabled?: boolean;
}

export default function Chip({ type, icon, text, size = 'default', setInput, disabled }: Props) {
  return (
    <ChipContainer type={type} disabled={disabled} size={size} onClick={setInput}>
      {type == 'category' ? <IconContainer>{icon}</IconContainer> : <Qoin width={20} height={20} />}
      <TextContainer>{text}</TextContainer>
    </ChipContainer>
  );
}

const ChipContainer = styled.div<Pick<Props, 'type' | 'disabled' | 'size'>>`
  width: fit-content;
  height: fit-content;
  background: var(--MR_WHITE);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  ${({ type }) => (type == 'category' ? styleCategory : 'padding: 0.1rem 0.2rem')};
  ${({ size }) => size == 'big' && 'padding: 0.6rem 0.4rem'};
  ${({ disabled }) => disabled && 'opacity: 0.45'};
`;

const styleCategory = `
  padding: 0.38rem 0.75rem;
  box-shadow: 0 0 0 0.8px var(--MR_GRAY2) inset; 
`;
const IconContainer = styled.div``;

const TextContainer = styled.div`
  text-align: right;
`;
