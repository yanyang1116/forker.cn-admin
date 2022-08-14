import { IPlogin } from '@/api/common/params';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import { useCallback } from 'react';
import store2 from 'store2';
import * as api from '../../api/common/index';
import logo from '../../assets/mz.jpeg';

export default () => {
	const handleLogin = useCallback(async (values: IPlogin) => {
		let token = '';
		try {
			token = await api.login(values);
			store2.set('token', token);

			// message.success('登录成功');
			history.push('/');
		} catch (err) {
			message.error(
				(err as IResponseError).message ?? JSON.stringify(err)
			);
		}
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
