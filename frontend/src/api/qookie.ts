// qookie API client 수정시 수정 필요
import { http } from './instance';

const getQookieInfo = async () => {
  // try {
  //   const res = await http.get('/api/cookie/getInfo');
  //   return res.data.payload;
  // } catch (e) {
  //   console.log('getQookieInfo', e);
  // }
};

const qookie = { getQookieInfo };
export default qookie;
