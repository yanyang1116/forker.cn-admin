/**
 * 这个是插件的 demo
 * 可以在编译时为你对项目做一些定制的事情，来满足项目需求
 * https://v3.umijs.org/zh-CN/guide/plugin-develop
 *
 * 一定要使用 module.exports，然后在 .umirc 里引入
 */
module.exports = (api) => {
  // 自己尝试，想要调整的部分，这个主要是为了运行时修改路由的一些内容
  // api.modifyRoutes((routes) => {
  //     return resetMainPath(routes, api.config.mainPath);
  // });

  // 官方 demo
  // api.logger.info('use plugin');

  // api.modifyHTML(($) => {
  //   $('body').prepend(`<h1>hello umi plugin</h1>`);
  //   return $;
  // });
};
