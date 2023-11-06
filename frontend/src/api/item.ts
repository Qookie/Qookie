import { AllItemProps } from '../pages/Store';
import { http } from './instance';

export interface ItemPropsResponse {
  msg: string;
  payload: AllItemProps | null;
}

const getItemList = async () => {
  try {
    const res = await http.get<ItemPropsResponse>('/api/item/list');
    console.log('itemRes', res);
    return res.payload;
  } catch (e) {
    console.log('getItemList', e);
  }
};

const getMyItemList = async () => {
  try {
    const res = await http.get<ItemPropsResponse>('/api/item/myItem');
    console.log('itemRes', res.payload);
    return res.payload;
  } catch (e) {
    console.log('getMyItemList', e);
  }
};

const orderItemReq = async (items: any) => {
  try {
    const orderReq = {
      items: [items],
    };
    const res = await http.post<ItemPropsResponse>('/api/item/order', orderReq);
    console.log('order res', res.payload);
    return res;
  } catch (e) {
    console.log('orderItemReq', e);
  }
};

const item = { getItemList, getMyItemList, orderItemReq };
export default item;
