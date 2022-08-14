/**
 * @file useFetch
 * loading 效果耦合在拦截器里了
 * 拦截器里的，debounce、cancel 预留了，具体就先不处理了
 */

import { Spin } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import * as ReactDOMServer from 'react-dom/server';

import styles from './index.less';
// TODO 还未解决
// import baseConfig from '@config/base.js';
import baseConfig from '../../config/base.js';

/**
 * 由于 umi 太变态了，只能这么搞
 * 最根本的问题是找不到容器节点
 */
let initLoading = false;
let isLoading = false;
const loadingDOM = document.createElement('div');
if (!initLoading) {
	loadingDOM.innerHTML = `<div class="${styles.mask}"></div><div class="${
		styles.content
	}">${ReactDOMServer.renderToString(<Spin />)}</div>`;
	loadingDOM.style.display = 'none';
	document.body.appendChild(loadingDOM);
	initLoading = true;
}

export type extraHeaders = Record<string, any> & {
	responseType: ResponseType;
	withCredentials: boolean;
};

/**
 * 注意在 tsx 里，不能这么写，要转成 function 的形式，主要是会和 jsx 语法有歧义
 * const axiosReqFn = async (config: AxiosRequestConfig<IResponse>) => {
 */
async function axiosReqFn<ResDetail = any>(
	config: AxiosRequestConfig<IResponse>
): Promise<ResDetail> {
	try {
		const res: AxiosResponse<IResponse> = await axios(config);
		if (res.status !== 200) throw res.statusText;
		if (!res.data.success) throw res.data.message;
		return res.data.value;
	} catch (err) {
		const _err: IResponseError = {
			message: JSON.stringify(err),
		};
		throw _err;
	}
}

function sendWrap<ResDetail>(method: 'post' | 'get') {
	async function fn(
		path: string,
		parmas: any,
		loading?: boolean
	): Promise<ResDetail>;
	async function fn(
		path: string,
		parmas: any,
		extraHeaders?: extraHeaders
	): Promise<ResDetail>;
	async function fn(
		path: string,
		parmas: any,
		extraHeaders?: extraHeaders,
		loading?: boolean
	): Promise<ResDetail>;
	async function fn(
		path: string,
		parmas: any,
		query?: boolean | extraHeaders,
		loading?: boolean
	): Promise<ResDetail> {
		/**
		 * TODO
		 * 1. debounce 可以在这里写，但是似乎也没有必要，直接页面逻辑里做可能更好
		 * 2. 取消请求也可以额外封装，但是似乎也没有场景
		 */
		let config: AxiosRequestConfig<IResponse> = {
			method,
			url: path,
			baseURL: baseConfig.host,
		};
		// 传入额外头部信息的情况
		if (typeof query !== 'boolean' && query) {
			config = {
				...config,
				withCredentials: !!query.withCredentials,
				responseType: query.responseType,
				headers: query,
				baseURL: query.baseURL ?? `${baseConfig.host}`,
			};
		}
		config.method === 'get' && (config.params = parmas);
		config.method === 'post' && (config.data = parmas);

		try {
			// 传入 loading 且为 true 的情况
			if (
				(typeof query === 'boolean' || typeof loading === 'boolean') &&
				(query || loading) &&
				!isLoading
			) {
				isLoading = true;
				loadingDOM.style.display = 'block';
			}
			const res = await axiosReqFn<ResDetail>(config);
			if (isLoading) {
				// 取消 loading 动作
				isLoading = false;
				loadingDOM.style.display = 'none';
			}
			return res;
		} catch (err) {
			console.log(
				`%c 【请求错误】： %c ${path}：${
					(err as IResponseError).message ?? err
				}`,
				'color:#fff;background:red;',
				'color:#000;'
			);
			isLoading = false;
			loadingDOM.style.display = 'none';
			throw err;
		}
	}
	return fn;
}

export const get = function get<ResDetail>() {
	return sendWrap<ResDetail>('get');
};

export const post = function post<ResDetail>() {
	return sendWrap<ResDetail>('post');
};
