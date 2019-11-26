import { IRoute } from 'umi-types'

/* 项目路由配置 (采用配置式路由) */
const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      { path: '/', component: '../pages/index' }
    ]
  }
]

export default routes
