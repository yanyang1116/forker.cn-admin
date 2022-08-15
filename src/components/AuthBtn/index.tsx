import { getDvaApp } from '@umijs/max';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';

interface BtnProps extends Omit<ButtonProps, 'disabled'> {
	'r-auth': keyof IAuthStatus;
}

export default (props: BtnProps) => {
	const dva = getDvaApp();
	const authModel = dva._models.find(
		(item: any) => item.namespace === 'authStatus'
	);
	let disabled = false;
	if (!authModel.state[props['r-auth']]) disabled = true;
	let _props = JSON.parse(JSON.stringify(props));
	delete (_props as Partial<typeof props>)['r-auth'];
	(_props as BtnProps & { disabled?: boolean }).disabled = disabled;
	return <Button {..._props}>{props.children}</Button>;
};
