import styled, { keyframes } from 'styled-components';
import Text from '../../atoms/Text';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onComplete: () => void;
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  onComplete,
}: BottomModalProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      setVisible(() => true);
    } else {
      timeoutId = setTimeout(() => setVisible(() => false), 350);
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Backdrop onClick={onClose} isOpen={isOpen} />
      <Container isOpen={isOpen}>
        <TopConatiner>
          <Title>{title}</Title>
          <XMarkIcon width={'1.4rem'} height={'1.4rem'} onClick={onClose} />
        </TopConatiner>
        <ChildrenContainer>{children}</ChildrenContainer>
      </Container>
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
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ isOpen }) => (isOpen ? fadeOut : fadeIn)} 0.3s ease-in-out forwards;
`;

const Container = styled.div<{ isOpen: boolean }>`
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
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`;

const SlideUp = keyframes`
  from {
    transform: translateY(180%);
  }
  to {
    transform: none;
  }
`;

const SlideDown = keyframes`
  from {
    transform: none;
  }
  to {
    transform: translateY(180%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
