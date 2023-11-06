import styled from 'styled-components';
import {
  Alarm,
  Challenge,
  Cookie,
  Heart,
  Item,
  Quest,
} from '../../../../assets/svgs/notification';

export default function NotificationImage({ category }: { category: string }) {
  const selected = () => {
    switch (category) {
      case 'alarm':
        return <Alarm />;
      case 'challenge':
        return <Challenge />;
      case 'cookie':
        return <Cookie />;
      case 'heart':
        return <Heart />;
      case 'item':
        return <Item />;
      case 'quest':
        return <Quest />;
      default:
        return <></>;
    }
  };
  return <ImageSize>{selected()}</ImageSize>;
}

const ImageSize = styled.div`
  & > svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
