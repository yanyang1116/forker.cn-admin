/**
 * access 插件，真 TM 难用
 * https://v3.umijs.org/zh-CN/plugins/plugin-access
 * https://next.umijs.org/docs/max/access
 */
export default (initialState: IAppInitialState) => {
	return {
		...initialState.auth,
	};
};
