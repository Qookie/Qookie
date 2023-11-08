import { ItemTypeProps } from '../components/store/molecules/Item';
import { orderReqProps } from '../components/store/organisms/Cart';
import { AllItemProps } from '../pages/Store';
import { wearReqType } from '../types';
import { http } from './instance';

export interface ItemPropsResponse {
  msg: string;
  payload: AllItemProps | null;
}

const getItemList = async () => {
  try {
    const res = await http.get<ItemPropsResponse>('/api/item/list');
    return res.payload;
  } catch (e) {
    console.log('getItemList', e);
  }
};

const getMyItemList = async () => {
  try {
    const res = await http.get<ItemPropsResponse>('/api/item/myItem');
    return res.payload;
  } catch (e) {
    console.log('getMyItemList', e);
  }
};

const orderItemReq = async (itemId: orderReqProps[]) => {
  try {
    const orderReq = {
      items: itemId,
    };
    const res = await http.post<ItemPropsResponse>('/api/item/order', orderReq);
    return res;
  } catch (e) {
    console.log('orderItemReq', e);
  }
};

const wearItemReq = async (itemId: wearReqType) => {
  try {
    const res = await http.patch<ItemPropsResponse>('/api/item/wear', itemId);
    return res;
  } catch (e) {
    console.log('orderItemReq', e);
  }
};

const item = { getItemList, getMyItemList, orderItemReq, wearItemReq };
export default item;
