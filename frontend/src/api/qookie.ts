import { QookieInfoResponse } from '../pages/Home';
import { QookieInfo } from '../types';
import { http } from './instance';

const getQookieInfo = async () => {
  try {
    const res = await http.get<QookieInfoResponse>('/api/cookie/getInfo');
    console.log('qookieRes', res);
    // res.payload 로 data 확인 후 변경 필요
    return res.payload;
  } catch (e) {
    console.log('getQookieInfo', e);
  }
};

const qookie = { getQookieInfo };
export default qookie;
