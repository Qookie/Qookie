import NotificationList from '../components/notification/organisms/NotificationList';
import { useState, useEffect } from 'react';
import { NotificationProp } from '../types';
import Text from '../components/shared/atoms/Text';
import styled from 'styled-components';
import { http } from '../api/instance';
import { ResponseType } from '../types';
import { getMonthDate } from '../utils/date';

const testProp1 = {
  notificationId: 1,
  category: 'alarm',
  info: '없음',
  createdAt: '오늘',
};

const testProp2 = {
  notificationId: 2,
  category: 'challenge',
  info: '챌린지명',
  createdAt: '오늘',
};

const testProp3 = {
  notificationId: 3,
  category: 'cookie',
  info: '쿠키이름',
  createdAt: '어제',
};

const testProp4 = {
  notificationId: 4,
  category: 'heart',
  info: '쿠키이름',
  createdAt: '어제',
};

const testProp5 = {
  notificationId: 5,
  category: 'item',
  info: '아이템명',
  createdAt: '어제',
};

const testProp6 = {
  notificationId: 6,
  category: 'quest',
  info: '퀘스트명',
  createdAt: '어제',
};

const testest = [
  [testProp1, testProp2],
  [testProp3, testProp4],
  [testProp5, testProp6],
];

export default function Notification() {
  const [notificationListList, setNotificationListList] = useState<NotificationProp[][]>(testest);
  console.log('LIST: ', notificationListList);

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
        console.log(res);
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
        {notificationListList.map((nl) => {
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
`;
