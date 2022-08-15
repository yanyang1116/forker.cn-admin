/**
 * 运行时配置
 * https://v3.umijs.org/zh-CN/docs/runtime-config
 * 我真实觉得 umi 太难用了
 */
import { getDvaApp, history } from '@umijs/max';
import store2 from 'store2';

import { authStatus as authStatusApi } from './api/common/index';
import logo from './assets/mz.jpeg';

/**
 * 初始化数据，可以在各个插件中被使用，真是个 sb 的设计
 * https://v3.umijs.org/zh-CN/plugins/plugin-initial-state
 *
 * 这里呢，为了使用这个插件，我是【强行】用的，把权限数据单独请求一份保存进去
 * 实际上，这个文件里切换路由【onRouteChange】里也会做权限处理，并且存一个单独的 model
 * 如果这个权限插件只和菜单关联的话，在这个文件的【postMenuData】里修改菜单数据，也能实现同样的效果
 */
export async function getInitialState() {
	// 因为目前拿不到 dva，所以不能通过 dispatch 派发，只能 ajax 请求获取
	let auth: IAuthStatus = {
		edit: false,
		view: false,
		delete: false,
		create: false,
	};
	if (store2.get('token')) {
		// 不 catch 了，静默失败
		await authStatusApi().then((res) => {
			auth = res;
		});
	}
	return {
		auth,
	};
}

/**
 * 这个 layout 字段，是 umi layout 的【运行时】配置
 * umi layout，需要在 .umirc 里【开启】，并且写入【构建时】配置：
 * https://umijs.org/docs/max/layout-menu
 *
 * 这个是和 umi 一起使用对一个文档，一定要看：
 * https://procomponents.ant.design/components/layout#%E5%92%8C-umi-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8
 *
 * 这个配置里对返回值，是 umi 暴露给我们的，我们要按照 umi 对约定来
 *
 * 通过 layout 插件，会默认使用 proLayout 包裹路由内容
 * 所以我们在具体路由里，只要写 PageContainer
 *
 * 这里有一点要注意，虽然文档说，都能透传给 proLayout
 * 但是还是发现有些 props 【不能】生效
 */
export const layout = () => {
	return {
		// 没研究出来
		// logout: () => {
		//   alert(123123)
		// },
		siderWidth: 180,
		logo: (
			<img src={logo} style={{ height: '60px', marginRight: '.5em' }} />
		),
		menuFooterRender() {
			return (
				<p style={{ textAlign: 'center', fontSize: 12 }}>©2022 yy</p>
			);
		},
		postMenuData(data: any) {
			// 为了删除一个 umi 特定对标记，真的垃圾
			const removeDOM = document.querySelector(
				'.umi-plugin-layout-right'
			) as any;
			if (removeDOM) removeDOM.innerHTML = '';

			// 要返回 data 来下一步处理菜单
			return data;
		},
	};
};

/**
 * 路由拦截，可以做一些埋点动作
 */
export function onRouteChange({ location, routes, action }: any) {
	/**
	 * 权限未初始化过，重新请求
	 * 本来想在 render 里写的，没想到智障的 umi 拿不到 dva
	 */
	if (!store2.get('token')) return;
	const dva = getDvaApp();
	const authModel = dva._models.find(
		(item: any) => item.namespace === 'authStatus'
	);
	if (!authModel.state.inited) {
		const { dispatch } = dva._store;
		dispatch({
			type: 'authStatus/reqAuth',
		});
	}
}

/**
 * https://v3.umijs.org/zh-CN/docs/runtime-config#renderoldrender-function
 */
export function render(oldRender: () => any) {
	oldRender();
	/**
	 * 一定要写在 oldRender 后面，才能拿到 history
	 */
	if (!store2.get('token')) {
		history.push('/login');
		return;
	}
}
