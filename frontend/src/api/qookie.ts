import { MyqookieProps } from '../components/mypage/molecules/MyqookieListItem';
import { ResponseType } from '../types';
import { http } from './instance';

interface MyqookieResType {
  msg: string;
  payload: MyqookieProps[];
}

const getQookieInfo = async () => {
  try {
    const res = await http.get<ResponseType>('/api/cookie/getInfo');
    console.log('qookieRes', res);
    return res.payload;
  } catch (e) {
    console.log('getQookieInfo', e);
  }
};

const getProxyUrl = async (url: string) => {
  try {
    const res = await http.get<string>(`/html2canvas/proxy.json?url=${url}`);
    return res;
  } catch (e) {
    console.log('getProxyUrl', e);
  }
};

const bakeQookieReq = async (image: File) => {
  try {
    const formData = new FormData();
    image && formData.append('image', image);
    const res = await http.post<ResponseType>(`/api/cookie/bake`, formData, true);
    return res;
  } catch (e) {
    console.log('bakeQookieReq', e);
  }
};

const getQookieList = async () => {
  try {
    const res = await http.get<MyqookieResType>('/api/cookie/list');
    return res.payload;
  } catch (e) {
    console.log('getQookieList', e);
  }
};

const qookie = { getQookieInfo, getProxyUrl, bakeQookieReq, getQookieList };
export default qookie;
