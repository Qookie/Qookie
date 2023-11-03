import { NotificationProp } from '../../../../types';

export default function NotificationContent({ prop }: { prop: NotificationProp }) {
  return <>{prop.info}</>;
}
