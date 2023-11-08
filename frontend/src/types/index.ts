export interface QookieInfo {
  name: string;
  createdAt: string;
  style: string[];
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
