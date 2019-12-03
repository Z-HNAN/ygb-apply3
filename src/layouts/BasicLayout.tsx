/**
 * 普通布局
 */

import React, { PureComponent } from 'react'
import MenuBar from './MenuBar'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'

import { IConnectState } from '@/models/connect.d'

import styles from './BasicLayout.less'

// 需要路由跳转的页面
const BarRoutes= ['/post', '/schedule', '/me']

const BasicLayout: React.FC<any> = props => {
  const { children, location } = props

  // 不在tabBar中的
  if (BarRoutes.indexOf(location.pathname) < 0) {
    return <div className={styles.root}>{children}</div>;
  }

  return (
    <div className={styles.root}>
      <MenuBar pathname={location.pathname} >{children}</MenuBar>
    </div>
  );
}

const mapStateToProps = (state: IConnectState) => {
  return {}
}

export default React.memo(withRouter(connect(mapStateToProps)(BasicLayout)))
