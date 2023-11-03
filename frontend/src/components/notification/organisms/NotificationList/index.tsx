import NotificationListItem from '../../molecules/NotificationListItem';
import { NotificationProp } from '../../../../types';

export default function NotificationList(
	{notificationList} : {notificationList: NotificationProp[]}
) {

  return <>{
		notificationList.map((n) => {
			return <NotificationListItem key={n.notificationId} prop={n} />;
		})
	}
	</>
}
