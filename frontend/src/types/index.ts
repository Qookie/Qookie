export interface QookieInfo {
  name: string;
  createdAt: string;
  active: number;
  exp: number;
  level: number;
  body: string;
  extraBody: string;
  eye: string;
  mouth: string;
  hat: string;
  top: string;
  bottom: string;
  shoe: string;
  background: string;
  accessories: string[];
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
