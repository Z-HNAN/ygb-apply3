/**
 * 岗位大厅
 */

import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { connect } from 'dva';
import {
  Button,
  Tabs,
} from 'antd-mobile'

import { IConnectState } from '@/models/connect.d'
import { Dispatch, AnyAction } from 'redux';

import DeparmentComponent from './components/Department'

import styles from './index.less'


interface IProps {
  dispatch: Dispatch<AnyAction>
}


const tabs = [
  { title: '普通岗位', key: 'normal' },
  { title: '公寓中心', key: 'department' },
]

const Post: React.FC<IProps> = props => {
  const { dispatch } = props

  function renderTabBar(props: any) {
    return (
      <Sticky>
        {({ style }) => <div style={{...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
      </Sticky>
    )
  }

  return (
    <div>
      <StickyContainer>
        <Tabs
          tabs={tabs}
          renderTabBar={renderTabBar}
        >
          <div className={styles.tabsContainer} key='normal'>
            Content of first tab
          </div>
          <div className={styles.tabsContainer} key='department'>
            <DeparmentComponent />
          </div>
        </Tabs>
      </StickyContainer>
    </div>
  )
}

const mapStateToProps = (state: IConnectState) => {
  return {}
}

export default connect(mapStateToProps)(Post)
