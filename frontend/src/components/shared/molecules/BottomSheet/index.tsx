import styled, { keyframes } from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BottomModalProps {
  isOpen: boolean | null;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomModalProps) {
  if (isOpen !== null) {
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
}

const Backdrop = styled.div<{ isOpen: boolean | null }>`
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: min(100%, 430px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ isOpen }) => (isOpen ? FadeIn : FadeOut)} 0.3s ease-in-out forwards;
`;

const Container = styled.div<{ isOpen: boolean | null }>`
  border-radius: 12px 12px 0px 0px;
  background: var(--MR_WHITE);
  position: fixed;
  bottom: 0;
  z-index: 20;
  width: min(100%, 430px);
  animation: ${({ isOpen }) => (isOpen ? SlideUp : SlideDown)} 0.3s ease-in-out forwards;
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
  height: 180px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`;

const SlideUp = keyframes`
  from {
    display: none;
    transform: translateY(180%);
  }
  to {
    display: block;
    transform: translateY(0%);
  }
`;

const SlideDown = keyframes`
  from {
    display: block;
    transform: translateY(0%);
  }
  to {
    display: none;
    transform: translateY(180%);
  }
`;

const FadeIn = keyframes`
  from {
    display: none;
    opacity: 0;
  }
  to {
    display: flex;
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  from {
    display: flex;
    opacity: 1;
  }
  to {
    display: none;
    opacity: 0;
  }
`;
