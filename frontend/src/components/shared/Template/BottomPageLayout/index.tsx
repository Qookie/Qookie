import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface BottomPageProps {
  isopen: boolean;
  onCloseRequest: () => void;
  children?: React.ReactNode;
}

function BottomPageLayout({ isopen, onCloseRequest, children }: BottomPageProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isopen) {
      setVisible(() => true);
    } else {
      timeoutId = setTimeout(() => setVisible(() => false), 350);
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isopen]);

  if (!visible) {
    return null;
  }

  return (
    <PageContainer isopen={isopen}>
      <Top>
        <XMarkIcon onClick={onCloseRequest} />
      </Top>
      <ChildrenContainer>{children}</ChildrenContainer>
    </PageContainer>
  );
}

const SlideUp = keyframes`
  from {
    transform: translateY(100%);
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
    transform: translateY(100%);
  }
`;

const PageContainer = styled.div<{ isopen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  background: var(--MR_WHITE);
  z-index: 20;
  width: min(100%, 430px);
  animation: ${({ isopen }) => (isopen ? SlideUp : SlideDown)} 0.35s ease-in-out forwards;
`;

const Top = styled.div`
  width: min(100%, 430px);
  top: 0;
  height: 4rem;
  position: fixed;
  display: flex;
  align-items: center;
  > svg {
    width: 1.4rem;
    height: 1.4rem;
    padding: 1rem;
  }
`;

const ChildrenContainer = styled.div``;

export default BottomPageLayout;
