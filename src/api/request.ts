/**
 * @file useFetch
 */
import axios, { AxiosPromise, AxiosRequestConfig, ResponseType } from 'axios';
import baseConfig from '../config/index';

export type extraHeaders = Record<string, any> & {
  responseType: ResponseType;
  withCredentials: boolean;
};

const sendWrap = <T>(method: 'post' | 'get') => {
  return (
    path: string,
    parmas: any,
    extraHeaders?: extraHeaders,
  ): AxiosPromise<T> => {
    const config: AxiosRequestConfig<T> = {
      baseURL: extraHeaders?.baseURL ?? `${baseConfig.host}`,
      method,
      url: path,
      withCredentials: !!extraHeaders?.withCredentials,
      responseType: extraHeaders?.responseType,
      headers: extraHeaders,
    };
    config.method === 'get' && (config.params = parmas);
    config.method === 'post' && (config.data = parmas);
    return axios(config);
  };
};

export const useFetch = () => {
  // 这种重定义的情况下，就只能用 type ，interface 实现不了
  const get: <T>(
    path: string,
    parmas: any,
    extraHeaders?: extraHeaders,
  ) => AxiosPromise<T> = sendWrap('get');
  const post: <T>(
    path: string,
    parmas: any,
    extraHeaders?: extraHeaders,
  ) => AxiosPromise<T> = sendWrap('post');
  return { get, post };
};
