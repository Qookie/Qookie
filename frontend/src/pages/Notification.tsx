import NotificationList from '../components/notification/organisms/NotificationList';
import { useState, useEffect } from 'react';
import { NotificationProp } from '../types';
import Text from '../components/shared/atoms/Text';
import styled from 'styled-components';
import { http } from '../api/instance';
import { ResponseType } from '../types';
import { getMonthDate } from '../utils/date';

export default function Notification() {
  const [notificationListList, setNotificationListList] = useState<NotificationProp[][]>();

  const getNotifications = async () => {
    return http
      .get<ResponseType>('/api/notification')
      .then((res) => {
        return res.payload;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNotifications().then((res) => {
      if (res) {
        setNotificationListList(res as NotificationProp[][]);
      }
    });
  }, []);

  return (
    <NotificationContainer>
      <TitleContainer>
        <Text typography="title">알림</Text>
      </TitleContainer>
      <NotificationListContainer>
        {notificationListList !== undefined &&
          notificationListList.map((nl) => {
            return (
              <div key={nl[0].notificationId}>
                <DateContainer>
                  <Text typography="button" color="gray">
                    {getMonthDate(nl[0].createdAt)}
                  </Text>
                </DateContainer>

                <NotificationList notificationList={nl} />
              </div>
            );
          })}
      </NotificationListContainer>
    </NotificationContainer>
  );
}

const NotificationContainer = styled.div`
  padding: 10vh 2vh 0;
`;

const TitleContainer = styled.div`
  margin-bottom: 5vh;
`;

const NotificationListContainer = styled.div``;

const DateContainer = styled.div`
  margin-top: 2vh;
  margin-bottom: 0.8vh;
`;
