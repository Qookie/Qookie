import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

export interface DialogProps {
  title: string;
  content: string;
  negative: string;
  onNegativeClick: (e?: React.MouseEvent<HTMLElement>) => void;
  positive: string;
  onPositiveClick: (e?: React.MouseEvent<HTMLElement>) => void;
  isopen: boolean;
  onCloseRequest: (e?: React.MouseEvent<HTMLElement>) => void;
}

export default function Dialog({
  title,
  content,
  negative,
  onNegativeClick,
  positive,
  onPositiveClick,
  isopen,
  onCloseRequest,
}: DialogProps) {
  if (!isopen) {
    return null;
  }

  return (
      <Backdrop onClick={onCloseRequest}>
        <DialogContainer>
          <Text typography="button">{title}</Text>
          <Text typography="main">{content}</Text>
          <ButtonContainer>
            <Button size="medium" theme="transparent" onClick={onPositiveClick}>
              {positive}
            </Button>
            <Button size="medium" onClick={onNegativeClick}>
              {negative}
            </Button>
          </ButtonContainer>
        </DialogContainer>
      </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: min(100%, 430px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogContainer = styled.div`
  border-radius: 1.25rem;
  padding: 1.8rem 0.8rem 0.8rem 0.8rem;
  background-color: var(--MR_WHITE);
  display: grid;
  gap: 0.7rem;
  width: calc(100% - 2rem);
  margin-bottom: 3rem;
  min-height: 12rem;
  box-sizing: border-box;
  z-index: 11;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
