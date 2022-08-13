import { extraHeaders, useFetch } from '../request';
import { IPlist } from './params.d';
import { IRlist } from './response.d';

const { get, post } = useFetch();

export const list = (params?: IPlist, headers?: extraHeaders) => {
  return get<IRlist>('/api/article/list', params, headers);
};
