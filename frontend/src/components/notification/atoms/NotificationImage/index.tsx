import styled from 'styled-components';
import { Alarm, Challenge, Cookie, Heart, Item, Quest } from '../../../../assets/svgs/notification';

type CategoryToImage = {
  [key: string]: JSX.Element;
};

const images: CategoryToImage = {
  Alarm: <Alarm />,
  Challenge: <Challenge />,
  Cookie: <Cookie />,
  Heart: <Heart />,
  Item: <Item />,
  Quest: <Quest />,
};

export default function NotificationImage({ category }: { category: string }) {
  return <ImageSize>{images[category]}</ImageSize>;
}

const ImageSize = styled.div`
  & > svg {
    width: 2.5rem;
    height: 2.2rem;
  }
`;
