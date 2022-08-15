/**
 * access 插件
 * https://v3.umijs.org/zh-CN/plugins/plugin-access
 * https://next.umijs.org/docs/max/access
 */
export default (initialState: IAppInitialState) => {
	return {
		...initialState.auth,
	};
};
