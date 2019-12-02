import { IRoute } from 'umi-types'

/* 项目路由配置 (采用配置式路由) */
const routes: IRoute[] = [
  // 默认跳转去post页面 
  {
    path: '/',
    redirect: '/post',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/post', component: './post', title: '岗位' },
      { path: '/postInfo', component: './postInfo', title: '岗位详情' },
      { path: '/schedule', component: './schedule', title: '计划' },
      { path: '/me', component: './me', title: '我的' },
      { path: '/users', component: './users', title: '用户' },
      { component: '404', title: '页面走丢了...' },
    ],
  }
]

export default routes
