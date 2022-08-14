/**
 * 运行时配置
 * https://v3.umijs.org/zh-CN/docs/runtime-config
 * 我真实觉得 umi 太难用了
 */

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import { getDvaApp, history } from '@umijs/max';
import store2 from 'store2';
import logo from './assets/mz.jpeg';

export async function getInitialState(): Promise<{
	name: string;
	logout: Record<string, any>;
}> {
	return {
		name: '@umijs/max',
		logout: {},
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
