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

const qookie = { getQookieInfo };
export default qookie;
