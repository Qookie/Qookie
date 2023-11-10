import NotificationListItem from '../../molecules/NotificationListItem';
import { NotificationProp } from '../../../../types';
import styled from 'styled-components';

export default function NotificationList({
  notificationList,
}: {
  notificationList: NotificationProp[];
}) {
  return (
    <>
      {notificationList.map((n) => {
        return (
          <ItemContainer key={n.notificationId}>
            <NotificationListItem prop={n} />
          </ItemContainer>
        );
      })}
    </>
  );
}

const ItemContainer = styled.div`
  margin-bottom: 1vh;
`;
