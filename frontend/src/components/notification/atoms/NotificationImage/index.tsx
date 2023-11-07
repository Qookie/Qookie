import styled from 'styled-components';
import { Alarm, Challenge, Cookie, Heart, Item, Quest } from '../../../../assets/svgs/notification';

export default function NotificationImage({ category }: { category: string }) {
  const selected = () => {
    switch (category) {
      case 'Alarm':
        return <Alarm />;
      case 'Challenge':
        return <Challenge />;
      case 'Cookie':
        return <Cookie />;
      case 'Heart':
        return <Heart />;
      case 'Item':
        return <Item />;
      case 'Quest':
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
