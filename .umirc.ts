/**
 * @file
 * 这个文件就是整个项目对配置文件，里面大部分都是对插件对配置
 * 有时候可能会看到 umi 文档有关于 config 对描述
 * 实际上这个文件就是何 config 对作用一样的
 */

import { defineConfig } from '@umijs/max';
import alias from './config/alias';
import routes from './config/routes';

export default defineConfig({
	alias,
	routes,
	access: {},
	model: {},
	initialState: {},
	request: {},
	// plugins: ['./plugins/menuRoute.cjs'], // 引入自定义插件的例子
	/**
	 * 关于此配置项，可以参考：
	 * https://umijs.org/docs/max/layout-menu
	 * 这个地方，只有【构建时】配置
	 * src/app.tsx 里有【运行时】约定，两者需要一起进行配置才能更好的使用
	 *
	 * 这个是和 umi 一起使用对一个文档，一定要看：
	 * https://procomponents.ant.design/components/layout#%E5%92%8C-umi-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8
	 */
	antd: {},
	layout: {
		title: 'hi, yy',
		name: '12312',
	},
	npmClient: 'yarn',

	// https://v3.umijs.org/zh-CN/plugins/plugin-dva#skipmodelvalidate
	dva: {},
});
