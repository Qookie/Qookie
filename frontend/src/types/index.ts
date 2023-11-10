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
  hat: ItemProp;
  top: ItemProp;
  bottom: ItemProp;
  shoe: ItemProp;
  background: ItemProp;
  accessories: ItemProp[];
}

interface ItemProp {
  id: number;
  media: string;
  name?: string;
  thumbnail?: string;
  isWear?: boolean;
  isNew?: boolean;
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
