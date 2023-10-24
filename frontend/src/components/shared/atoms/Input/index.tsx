import { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

function Input({ label, ...props }: InputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput {...props} />
    </Container>
  );
}

const Container = styled.div`
  font-size: 1.25rem;
  line-height: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  color: var(--MR_GRAY2);
  font-size: 0.8em;
  line-height: 1.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: #f7f7f7;
  outline: none;
  border: 0;
  padding: 0.6em 0.7em;
  font-weight: 500;
  font-family: inherit;
  border-radius: 8px;
  font-size: inherit;

  &::placeholder {
    font-weight: 400;
  }

  &:disabled {
    background-color: white;
    padding-left: 0px;
  }
`;

export default Input;
