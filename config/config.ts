import { IConfig } from 'umi-types'

import routes from './router.config'
import plugins from './plugin.config'


// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes,
  plugins,

  extraBabelPlugins: [
    [
      // 配置按需加载 antd-mobile 样式加载插件
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'css',
        // style: true
      },
    ]
  ],
}

export default config;
