/**
 * @file
 * 这个文件就是整个项目对配置文件，里面大部分都是对插件对配置
 * 有时候可能会看到 umi 文档有关于 config 对描述
 * 实际上这个文件就是何 config 对作用一样的
 */

import { defineConfig } from '@umijs/max';

export default defineConfig({
  access: {},
  model: {},
  initialState: {},
  request: {},
  // plugins: ['./plugins/menuRoute.js'], // 引入自定义插件对例子
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

  routes: [
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
  ],

  npmClient: 'yarn',
  dva: {},
});
