import { extraHeaders, get } from '../request';
import { IPlist } from './params.d';
import { IRlist } from './response.d';

export const list = (params?: IPlist, headers?: extraHeaders) =>
	get<IRlist>()('/api/article/list', params, headers, true);
