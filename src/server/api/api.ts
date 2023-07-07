import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from '../token/token';
import { BACKEND_URL } from '../../const/const';

export const createAPI = (): AxiosInstance =>{
  const api = axios.create({
    baseURL: BACKEND_URL,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
