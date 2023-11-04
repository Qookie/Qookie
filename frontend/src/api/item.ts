import { ItemProps } from '../components/store/molecules/Item';
import { http } from './instance';

export interface ItemPropsResponse {
  msg: string;
  payload: ItemProps[];
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
    console.log('itemRes', res);
    return res.payload;
  } catch (e) {
    console.log('getMyItemList', e);
  }
};

const item = { getItemList, getMyItemList };
export default item;
