import Axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { auth } from '../firebase/firebaseConfig';

// Todo: 서버 세팅후 .env 파일로 분리
export const BASE_URL = process.env.REACT_APP_HOST;

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onFailure = async (error: AxiosError) => {
  // if accessToken is not valid
  if (error.response?.status === 401) {
    const config = error.config;
    if (config === undefined) return;
    // update accessToken
    const accessToken = await auth.currentUser?.getIdToken();
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      config.headers[`Bearer ${accessToken}`] = accessToken;
      return await axios(config);
    }
  }
};

axios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
}, onFailure);

export const http = {
  get: function get<Response = unknown>(url: string) {
    return axios.get<Response>(url).then((res) => res.data);
  },
  post: function post<Response = unknown, Request = any>(
    url: string,
    body?: Request,
    isFile?: boolean,
  ) {
    const header = isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return axios.post<Response>(url, body, header).then((res) => res.data);
  },
  patch: function patch<Response = unknown, Request = any>(url: string, body?: Request) {
    return axios.patch<Response>(url, body).then((res) => res.data);
  },
};
