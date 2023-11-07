import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomModalProps) {
  return (
    <>
      <Backdrop onClick={onClose} isOpen={isOpen}>
        <Container isOpen={isOpen}>
          <TopConatiner>
            <Title>{title}</Title>
            <XMarkIcon width={'1.4rem'} height={'1.4rem'} onClick={onClose} />
          </TopConatiner>
          <ChildrenContainer>{children}</ChildrenContainer>
          <Button theme="default">완료</Button>
        </Container>
      </Backdrop>
    </>
  );
}

const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: min(100%, 430px);
  height: 100%;
  align-items: center;
  justify-content: center;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition:
    visibility ease-in-out 0.4s,
    opacity ease-in-out 0.4s;
`;

const Container = styled.div<{ isOpen: boolean }>`
  border-radius: 12px 12px 0px 0px;
  background: var(--MR_WHITE);
  position: fixed;
  bottom: 0;
  z-index: 20;
  width: min(100%, 430px);
  transform: translateY(${({ isOpen }) => (isOpen ? '0%' : '180%')});
  transition: transform ease-in-out 0.4s;
  padding: 15px 0px;
`;

const TopConatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px;
`;

const ChildrenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`;
