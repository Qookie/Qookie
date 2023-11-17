import styled from 'styled-components';
import { ReactComponent as KakaoIcon } from '../../../../assets/svgs/KakaoTalk_logo.svg';
import { ReactComponent as GoogleIcon } from '../../../../assets/svgs/Google_logo.svg';
import Text from '../../../shared/atoms/Text';
import { ButtonHTMLAttributes } from 'react';

export const socialLogin = ['kakao', 'google'] as const;
export type Social = (typeof socialLogin)[number];

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  social: Social;
}

const SocialLoginButtonContainer = styled.button<Pick<Props, 'social'>>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 52px;
  border-radius: 8px;
  border: 0;
  font-family: inherit;
  ${({ social }) => SOCIAL_VARIANT[social]}
`;

const SocialLoginButton = ({ social, ...props }: Props) => {
  const { Icon, text } = SOCIAL_CONTENT[social];

  return (
    <SocialLoginButtonContainer social={social} {...props}>
      {Icon} <Text>{text}</Text>
    </SocialLoginButtonContainer>
  );
};

const SOCIAL_VARIANT = {
  kakao: `
      background-color: #FAE100;
      color: #371D1E;
    `,
  google: `
      background-color: #ffffff;
      color: #4E5968;
      border: 1px solid var(--MR_GRAY1);
    `,
};

const SOCIAL_CONTENT = {
  kakao: {
    Icon: <KakaoIcon />,
    text: '카카오톡으로 시작하기',
  },
  google: {
    Icon: <GoogleIcon />,
    text: '구글로 시작하기',
  },
};

export default SocialLoginButton;
