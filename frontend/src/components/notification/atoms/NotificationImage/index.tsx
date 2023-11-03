import styled from 'styled-components';
import {
  Alarm,
  Challenge,
  Cookie,
  Favorite,
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
      case 'favorite':
        return <Favorite />;
      case 'item':
        return <Item />;
      case 'quest':
        return <Quest />;
      default:
        return <></>;
    }
  };
  return <>{selected()}</>;
}
