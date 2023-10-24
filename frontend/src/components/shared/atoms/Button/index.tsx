import styled from 'styled-components';

interface BtnProps {
  type?: 'default' | 'finished' | 'disabled' | 'transparent';
  background?: string;
  color?: string;
  opacity?: string;
}

export default function Button({ type = 'default', background, color, opacity, ...props }: BtnProps) {
  return <DefaultBtn type={type} background={background} color={color} opacity={opacity} {...props} />
}

const DefaultBtn = styled.button<BtnProps>`
  /* 공통 */
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

  ${({ type }) => (type ? TYPE_VARIANT[type] : '')};
`;

const TYPE_VARIANT = {
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
  `
};
