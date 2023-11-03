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
      case 'Challenge':
        return <Challenge />;
      case 'Cookie':
        return <Cookie />;
      case 'Favorite':
        return <Favorite />;
      case 'Item':
        return <Item />;
      case 'Quest':
        return <Quest />;
      default:
        return <></>;
    }
  };
  return <>{selected()}</>;
}
