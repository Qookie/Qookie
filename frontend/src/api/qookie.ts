import { QookieInfo } from '../types';
import { http } from './instance';

const getQookieInfo = async () => {
  try {
    const res: QookieInfo = await http.get('/api/cookie/getInfo');
    console.log('qookieRes', res);
    // res.payload 로 data 확인 후 변경 필요
    return res;
  } catch (e) {
    console.log('getQookieInfo', e);
  }
};

const qookie = { getQookieInfo };
export default qookie;
