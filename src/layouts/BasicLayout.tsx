/**
 * 普通布局
 */

import React, { PureComponent } from 'react'
import MenuBar from './MenuBar'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'

import styles from './BasicLayout.less'

const BasicLayout: React.FC<any> = props => {
  const { children, location } = props

  return (
    <div className={styles.root}>
      <MenuBar pathname={location.pathname} >{children}</MenuBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
}

export default withRouter(connect(mapStateToProps)(BasicLayout))
