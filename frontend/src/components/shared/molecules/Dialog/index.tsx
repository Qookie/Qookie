import { DialogHTMLAttributes } from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

export interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
  content: string;
  negative: string;
  positive: string;
}

export default function Dialog({ title, content, negative, positive, ...props }: DialogProps) {
  return (
    <DialogContainer>
      <Text typography="button">{title}</Text>
      <Text typography="main">{content}</Text>
      <ButtonContainer>
        <Button size='medium' theme='transparent'>{positive}</Button>
        <Button size='medium'>{negative}</Button>
      </ButtonContainer>
    </DialogContainer>
  );
}

const DialogContainer = styled.div`
  border-radius: 1.25rem;
  padding: 1.8rem 0.8rem 0.8rem 0.8rem;
  background-color: var(--MR_WHITE);
  display: grid;
  gap: 0.7rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 0.3rem;
`;
