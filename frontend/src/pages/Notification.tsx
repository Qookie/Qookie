import NotificationList from '../components/notification/organisms/NotificationList';
import { useState, useEffect } from 'react';
import { NotificationProp } from '../types';
import Text from '../components/shared/atoms/Text';
import styled from 'styled-components';
import { http } from '../api/instance';
import { ResponseType } from '../types';
import { getMonthDate } from '../utils/date';
import Error from '../components/shared/atoms/error';

export default function Notification() {
  const [notificationListList, setNotificationListList] = useState<NotificationProp[][]>();

  const isempty = (notificationListList: NotificationProp[][] | undefined) => {
    if (notificationListList !== undefined && notificationListList.length === 0) {
      return true;
    }
    return false;
  };

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
      {isempty(notificationListList) && <Error children="받은 알림이 없어요." />}
      <NotificationListContainer>
        {notificationListList !== undefined &&
          notificationListList.map((nl) => {
            return (
              <div key={nl[0].notificationId}>
                <DateContainer>
                  <DateText>{getMonthDate(nl[0].createdAt)}</DateText>
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

const DateText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: var(--MR_GRAY2);
`;
