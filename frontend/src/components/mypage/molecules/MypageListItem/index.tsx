import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import Challenge from '../../../../assets/pngs/challenge.png';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const mypageList = [
  'deco',
  'badge',
  'myQookie',
  'qoin',
  'info',
  'notice',
  'privacy',
  'logOut',
  'withDraw',
] as const;
export type Mypage = (typeof mypageList)[number];

interface Props {
  mypage: Mypage;
}

export default function MypageListItem({ mypage }: Props) {
  const { icon, intro } = MYPAGE_ITEM[mypage];
  return (
    <ItemContainer>
      <LeftContainer>
        <IconContainer>
          <img src={icon} width={30} />
        </IconContainer>
        <Text typography="button">{intro}</Text>
      </LeftContainer>
      <ArrowRightIcon width={30} />
    </ItemContainer>
  );
}

const MYPAGE_ITEM = {
  deco: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  badge: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  myQookie: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  qoin: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  info: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  notice: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  privacy: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  logOut: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
  withDraw: {
    icon: Challenge,
    intro: '쿠키 꾸미기',
  },
};

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  padding: 1rem;
`;
