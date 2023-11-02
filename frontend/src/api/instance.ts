import Axios, { InternalAxiosRequestConfig } from 'axios';

export const BASE_URL = process.env.REACT_APP_HOST

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export const http = {
  get: function get<Response = unknown>(url: string) {
    return axios.get<Response>(url).then((res) => res.data);
  },
  post: function post<Response = unknown, Request = any>(url: string, body?: Request) {
    return axios.post<Response>(url, body).then((res) => res.data);
  },
};
