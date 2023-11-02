import { QookieInfoResponse } from '../pages/Home';
import { http } from './instance';

const getQookieInfo = async () => {
  try {
    const res = await http.get<QookieInfoResponse>('/api/cookie/getInfo');
    console.log('qookieRes', res);
    return res.payload;
  } catch (e) {
    console.log('getQookieInfo', e);
  }
};

const getProxyUrl = async (url: string) => {
  try {
    const res = await http.get<JSON>(`/html2canvas/proxy.json?string=${url}`);
    console.log('proxy json', res);
    return res;
  } catch (e) {
    console.log('getProxyUrl', e);
  }
};

const qookie = { getQookieInfo, getProxyUrl };
export default qookie;
