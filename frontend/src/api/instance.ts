import { auth } from '../firebase/firebaseConfig';
import Axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_HOST;

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onFailure = async (error: AxiosError) => {
  const config = error.config;
  await auth.authStateReady();
  const currentUser = auth.currentUser;
  if (error.response?.status !== 401 || config === undefined || currentUser === null) {
    console.log('EXPIRED');
    return Promise.reject(error);
  }
  const accessToken = await currentUser.getIdToken();
  console.log('NEW TOKEN');
  localStorage.setItem('accessToken', accessToken);
  config.headers['Authorization'] = 'Bearer ' + accessToken;
  return axios(config);
};

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, onFailure);

export const http = {
  get: function get<Response = unknown>(url: string) {
    return axiosInstance.get<Response>(url).then((res) => res.data);
  },
  post: function post<Response = unknown, Request = any>(
    url: string,
    body?: Request,
    isFile?: boolean,
  ) {
    const header = isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return axiosInstance.post<Response>(url, body, header).then((res) => res.data);
  },
  patch: function patch<Response = unknown, Request = any>(url: string, body?: Request) {
    return axiosInstance.patch<Response>(url, body).then((res) => res.data);
  },
};
