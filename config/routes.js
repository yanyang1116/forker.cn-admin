/**
 * @file
 * umi 的路由配置，会被导入 .umirc 文件
 * 注意，umi 的路由和它自己的 layout 插件深度挂钩
 * layout 又和 antd 深度挂钩
 * 所以会暴露一些 menuRender、icon、target、hideInBreadcrumb 的额外配置
 * https://v2-pro.ant.design/docs/layout-cn
 */
export default [
	// 注意，不配置 name ，就不会再菜单里显示出来
	{
		name: 'Dashboard',
		path: '/',
		component: './Index',
		icon: 'pieChart',
		exact: true,
	},
	{
		name: '新建',
		icon: 'edit',
		path: '/edit',
		component: './Edit',
		routes: [
			{
				extra: true,
				path: '/edit/:id',
				component: './Edit',
				/**
				 * 因为父路由已经整个菜单隐藏了，这里只要配置不展示【面包屑】即可
				 * 注意：【面包屑】在二级路由对时候会自动展示
				 */
				hideInBreadcrumb: true,
			},
		],
		// 新窗口打开
		target: '_blank',
		// 整个菜单到隐藏，这个对具体意思是，到来这个路由之后，整个左侧菜单都会隐藏
		menuRender: false,
	},
	{
		icon: 'snippets',
		name: '列表',
		path: '/list',
		component: './List',
		exact: true,
	},
	{
		name: '垃圾箱',
		icon: 'delete',
		path: '/Trash',
		component: './Trash',
		exact: true,
	},
	/**
	 * 下面通过配置，能够脱离 layout，变成一个单独对页面布局
	 */
	{
		path: '/login',
		component: './Login',
		exact: true,
		// 到来这个路由，整个菜单不展示
		menuRender: false,
	},
];
