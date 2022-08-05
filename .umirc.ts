import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},

  /**
   * 关于此配置项，可以参考：
   * https://umijs.org/docs/max/layout-menu
   * 这个地方，只有【构建时】配置
   * src/app.tsx 里有【运行时】约定，两者需要一起进行配置才能更好的使用
   */
  layout: {
    title: 'hi, yy',
  },

  routes: [
    {
      name: 'Dashboard',
      path: '/',
      component: './Index',
    },
    {
      name: '新建',
      path: '/new',
      component: './New',
    },

    {
      name: '列表',
      path: '/list',
      component: './List',
    },
    {
      name: '垃圾箱',
      path: '/Trash',
      component: './Trash',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
    },
  ],

  npmClient: 'yarn',
  dva: {},
});
