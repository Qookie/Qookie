import { MyqookieProps } from '../components/mypage/molecules/MyqookieListItem';
import { ResponseType } from '../types';
import { http } from './instance';

interface MyqookieResType {
  msg: string;
  payload: MyqookieProps[];
}

interface BodyResType {
  msg: string;
  payload: { url: string };
}

const getQookieInfo = async () => {
  try {
    const res = await http.get<ResponseType>('/api/cookie/getInfo');
    return res.payload;
  } catch (e) {
    console.log('getQookieInfo', e);
  }
};

const getQookieLastBody = async () => {
  try {
    const res = await http.get<BodyResType>('/api/cookie/lastBody');
    return res.payload.url;
  } catch (e) {
    console.log('getQookieLastBody', e);
  }
};

const getProxyUrl = async (url: string) => {
  try {
    console.log('URL: ', url);
    const res = await http.get<string>(`/api/html2canvas/proxy.json?url=${url}`);
    console.log('GETPROXYURL: ', res);
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

const qookie = { getQookieInfo, getQookieLastBody, getProxyUrl, bakeQookieReq, getQookieList };
export default qookie;
