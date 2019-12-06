/**
 * 岗位大厅
 */

import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import {
  Button,
  Tabs,
} from 'antd-mobile'

import DeparmentComponent from './components/Department'
import NormalComponent from './components/Normal'

import styles from './index.less'


interface IProps {
}

const tabs = [
  { title: '普通岗位', key: 'normal' },
  { title: '公寓中心', key: 'department' },
]

const Post: React.FC<IProps> = props => {
  const { } = props

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
          <div className={styles.tabsContainer} key='department'>
            <NormalComponent />
          </div>
          <div className={styles.tabsContainer} key='normal'>
            <DeparmentComponent />
          </div>
        </Tabs>
      </StickyContainer>
    </div>
  )
}

export default React.memo(Post)
