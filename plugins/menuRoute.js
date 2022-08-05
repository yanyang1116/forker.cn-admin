/**
 * 这个是插件对 demo
 * 可以在编译时为你对项目做一些定制的事情，来满足项目需求
 * https://v3.umijs.org/zh-CN/guide/plugin-develop
 *
 * 一定要使用 module.exports，然后在 .umirc 里引入
 */
module.exports = (api) => {
  // api.modifyRoutes((routes) => {
  //     return resetMainPath(routes, api.config.mainPath);
  // });
  api.logger.info('use plugin');

  api.modifyHTML(($) => {
    $('body').prepend(`<h1>hello umi plugin</h1>`);
    return $;
  });
};
