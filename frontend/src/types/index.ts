import { ItemProps } from './item';

export interface QookieInfo {
  name: string;
  createdAt: string;
  exp: number;
  level: number;
  body: string;
  extraBody: string;
  eye: string;
  mouth: string;
  hat: ItemProps;
  top: ItemProps;
  bottom: ItemProps;
  shoe: ItemProps;
  background: ItemProps;
  accessories: ItemProps[];
}

export interface NotificationProp {
  notificationId: number;
  category: string;
  info: string;
  createdAt: string;
}

export interface ResponseType {
  msg: string;
  payload: object;
}

export interface wearReqType {
  hatId: number;
  topId: number;
  bottomId: number;
  shoeId: number;
  backgroundId: number;
  accessories: number[];
}
