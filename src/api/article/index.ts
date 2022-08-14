import { extraHeaders, get } from '../request';
import { IPList } from './params.d';
import { IRList } from './response.d';

export const list = (params?: IPList, headers?: extraHeaders) =>
	get<IRList>()('/api/article/list', params, headers);
