import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import {toast} from 'react-toastify';
import { getToken } from '../token/token';
import { BACKEND_URL } from '../../const/const';

const StatusCode: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const searchAnswer = (response: AxiosResponse) => !!StatusCode[response.status];

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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && searchAnswer(error.response)) {
        toast.error(error.response.data.error,{
          theme: 'colored',
          autoClose: 4000
        }
        );
      }
    }
  );

  return api;
};
