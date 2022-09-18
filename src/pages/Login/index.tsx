import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useCallback, useEffect } from 'react';
import store2 from 'store2';

import * as api from '@/api/common/index';
import type { IPLogin } from '@/api/common/params';
import logo from '@/assets/mz.jpeg';

export default () => {
	const handleLogin = useCallback(async (values: IPLogin) => {
		let token = '';
		try {
			token = await api.login(values);
			store2.set('token', token);
			message.success('登录成功');
			/**
			 * 这里有个很大的问题：
			 * 浏览器历史的 history 清不掉，所以用户的行为后退都会打到之前的地方
			 * 如何解决？
			 * 1. 一个思路是通过 redirectUrl，在 login 页面里，有 token，有 redirectUrl 就往 redirectUrl 跳
			 * 2. 这就要求，要有个 api 检查 token 是否过期，然后前端要来清这个 token
			 *
			 * 这里就不搞 redirectUrl 了，直接往应用主页跳，token 的检查先不做试试看
			 * --------------------------------------------------------------------------------
			 * 拿权限的动作，统一收口在初始化的地方，这里做浏览器的刷新动作
			 * 没有用 redirectUrl 做一些重定向动作
			 */
			location.replace(`${location.origin}`);
		} catch (err) {
			message.error(
				typeof err === 'string'
					? err
					: (err as IResponseError).message ?? JSON.stringify(err)
			);
		}
	}, []);

	useEffect(() => {
		// store2.remove('token');
	}, []);

	return (
		<LoginForm
			logo={logo}
			title="hi, yy"
			subTitle="forker.cn"
			onFinish={handleLogin}
		>
			<ProFormText
				name="userName"
				fieldProps={{
					size: 'large',
					prefix: <UserOutlined className={'prefixIcon'} />,
				}}
				placeholder={'用户名'}
				rules={[
					{
						required: true,
						message: '请输入用户名!',
					},
				]}
			/>

			<ProFormText.Password
				name="password"
				fieldProps={{
					size: 'large',
					prefix: <LockOutlined className={'prefixIcon'} />,
				}}
				placeholder={'密码'}
				rules={[
					{
						required: true,
						message: '请输入密码！',
					},
				]}
			/>
		</LoginForm>
	);
};
