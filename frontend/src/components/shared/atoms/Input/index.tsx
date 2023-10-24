import { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <Label>{label}</Label>
      <StyledInput {...props} />
    </div>
  );
}

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  color: var(--MR_GRAY2);
  line-height: 1.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: #f7f7f7;
  outline: none;
  border: 0;
  font-size: 1.25rem;
  padding: 0.75rem 0.875rem;
  font-weight: 500;
  font-family: inherit;
  border-radius: 0.5rem;
  line-height: 1.25rem;

  &::placeholder {
    font-weight: 400;
  }

  &:disabled {
    background-color: white;
    padding-left: 0px;
  }
`;

export default Input;
