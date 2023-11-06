import NotificationList from "../components/notification/organisms/NotificationList";
import { useState, useEffect } from "react";
import { NotificationProp } from "../types";
import Title from "../components/shared/atoms/Title";
import Text from "../components/shared/atoms/Text";
import styled from "styled-components";

const testProp1 = {
	notificationId: 1,
	category: "challenge",
	info: "challengeTitle",
	createdAt: "today"
}

const testProp2 = {
	notificationId: 2,
	category: "item",
	info: "itemName",
	createdAt: "today"
}

export default function Notification() {
  const [notificationList, setNotificationList] = useState<NotificationProp[]>([testProp1, testProp2]);
	console.log("LIST: ", notificationList)

  // const getNotifications = async () => {
  //   return [testProp, testProp];
  // };

  // useEffect(() => {
  //   getNotifications().then((res) => {
  //     setNotificationList(res);
  //   });
  // }, [notificationList]);
	
  return (
		<>
			<Text typography="title">this is text</Text>
			<NotificationList notificationList={notificationList}/>
		</>
	);
}
