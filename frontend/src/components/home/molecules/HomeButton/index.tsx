import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { CSSProperties } from 'react';

interface HomeBtnProps {
  title: string;
  icon: string;
  customStyle: CSSProperties;
  onClick: () => void;
}

export default function HomeButton({ title, icon, customStyle, onClick }: HomeBtnProps) {
  return (
    <ItemContainer style={customStyle} onClick={onClick}>
      <Text typography="button">{title}</Text>
      <IconContainer src={icon} alt={icon} />
    </ItemContainer>
  );
}

const ItemContainer = styled.button`
  padding: 1rem 0.5rem 0.5rem 1rem;
  width: 100%;
  height: 4.75rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  position: relative;
  border: none;
  display: inline-flex;
`;

const IconContainer = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: auto;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;
