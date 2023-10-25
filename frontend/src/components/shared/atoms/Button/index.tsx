import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'default' | 'finished' | 'disabled' | 'transparent';
  size?: 'sm' | 'icon' | 'medium' | 'large';
  background?: string;
  color?: string;
  opacity?: string;
}

export default function Button({ theme = 'default', size = 'large', background, color, opacity, ...props }: BtnProps) {
  return <DefaultBtn theme={theme} size={size} background={background} color={color} opacity={opacity} {...props} />
}

const DefaultBtn = styled.button<BtnProps>`
  width: 328px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: 600;
  font-size: 20px;
  color: var(--MR_WHITE);
  background: var(--MR_RED);
  cursor: pointer;

  ${({ theme }) => (theme ? THEME_VARIANT[theme] : '')};
  ${({ size }) => (size ? SIZE_VARIANT[size] : '')}
`;

const THEME_VARIANT = {
  default: `
  `,
  finished: `
    opacity: 0.5;
  `,
  disabled: `
    background: var(--MR_GRAY1);
  `,
  transparent: `
    color: var(--MR_BLACK);  
    background: none;
  `,
};

const SIZE_VARIANT = {
  sm: `
    width: 60px;
    height: 28px;
    font-size: 16px
  `,
  icon: `
    width: 114px;
  `,
  medium: `
    width: 140px;
  `,
  large: `
  `,
};
