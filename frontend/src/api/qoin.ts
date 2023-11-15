import { http } from './instance';

interface ResType {
  msg: string;
  payload: number;
}

const getQoinList = async () => {
  try {
    const res = await http.get<ResType>('/api/item/coin');
    return res.payload;
  } catch (e) {
    console.log('getQoinList', e);
  }
};

const qoin = { getQoinList };
export default qoin;
