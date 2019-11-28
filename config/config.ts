import { IConfig } from 'umi-types'

import routes from './router.config'
import plugins from './plugin.config'


// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes,
  plugins,

  /* less配置 */
  lessLoaderOptions: {
    javascriptEnabled: true,
  },

  /* babel插件配置 */
  extraBabelPlugins: [
    // 此处定制了主题，采用了全局样式引入,不需要修改主题，可将此处放开，并删除global中的全局引入
    // [
    //   // 配置按需加载 antd-mobile 样式加载插件
    //   require.resolve('babel-plugin-import'),
    //   {
    //     libraryName: 'antd-mobile',
    //     style: true
    //   },
    // ]
  ],

  /* 排除svg */
  urlLoaderExcludes: [/.svg$/],

  /* webpack其他配置 */
  chainWebpack(config) {
    // 设置svg loader
    config.module
      .rule('svg')
      .test(/.svg$/)
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'))
      .options({ symbolId: 'icon-[name]' })
  }
}

export default config;
