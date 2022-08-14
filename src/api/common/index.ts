import { extraHeaders, post } from '../request';
import { IPAuthStatus, IPLogin } from './params.d';
import { IRAuthStatus, IRLogin } from './response.d';

export const login = (params?: IPLogin, headers?: extraHeaders) =>
	post<IRLogin>()('/api/common/login', params, headers);

export const authStatus = (params?: IPAuthStatus, headers?: extraHeaders) =>
	post<IRAuthStatus>()('/api/common/authStatus', params, headers);
